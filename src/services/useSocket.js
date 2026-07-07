import { toast } from "sonner";
import { toastPresets } from "../components/toasters";
import { getToken } from "../libs/token";

let ws = null;
let reconnectTimer = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;
let intentionalClose = false;

const callbacks = {
  JOB_APPLY: null,
  JOB_MAIL: null,
  QUEUE_STATUS: null,
};

const pendingPromises = {};

function connect() {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
    return;
  }

  ws = null;

  const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:5000";
  ws = new WebSocket(`${wsUrl}?accessToken=${getToken()}`);

  ws.onopen = () => {
    reconnectAttempts = 0;
  };

  ws.onmessage = (event) => {
    const res = JSON.parse(event.data);
    const type = res.type;

    if (pendingPromises[type]) {
      pendingPromises[type](res);
      delete pendingPromises[type];
    }

    if (callbacks.QUEUE_STATUS && type == "QUEUE_STATUS") {
      return callbacks.QUEUE_STATUS(res);
    }

    if (callbacks.JOB_MAIL && type == "JOB_MAIL") {
      return callbacks.JOB_MAIL(res);
    }

    if (callbacks.JOB_APPLY && type == "JOB_APPLY") {
      return callbacks.JOB_APPLY(res);
    }
  };

  ws.onerror = () => {
    console.error("WebSocket connection error");
  };

  ws.onclose = () => {
    ws = null;
    Object.keys(pendingPromises).forEach((key) => {
      pendingPromises[key]({ status: "failed", error: "Connection closed" });
      delete pendingPromises[key];
    });

    if (!intentionalClose && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
      reconnectAttempts++;
      reconnectTimer = setTimeout(connect, delay);
    }
  };
}

export function connector() {
  intentionalClose = false;
  connect();
}

export function disconnect() {
  intentionalClose = true;
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  if (ws) {
    ws.close();
    ws = null;
  }
}

export function sendMessage(type, data) {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    connector();
    setTimeout(() => {
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        toast.error("Connection Lost", {
          id: "connection-lost",
          ...toastPresets.generalError(
            "Not connected. Please check your connection and try again.",
          ),
          position: "top-right",
        });
      }
    }, 3000);
    return false;
  }

  if (type == "JOB_APPLY") {
    toast.loading("Tailoring Resume", {
      ...toastPresets.aiProcessing(),
      description:
        "Generating a tailored resume and email template for the job",
      id: "ai-processing",
      position: "top-right",
      duration: Infinity,
    });
  }
  if (type == "JOB_MAIL") {
    toast.loading("Processing and sending mail!", {
      ...toastPresets.aiProcessing(),
      id: "job-mail",
      position: "top-right",
      description: "On success, email will be received by the hiring address",
      duration: Infinity,
    });
  }

  ws.send(JSON.stringify({ type, data }));

  return new Promise((resolve) => {
    pendingPromises[type] = (res) => {
      resolve(res);
      if (callbacks[type]) {
        callbacks[type](res);
      }
    };
  });
}

export function onQueueStatus(cb) {
  callbacks.QUEUE_STATUS = cb;
}

export function onJobApply(cb) {
  callbacks.JOB_APPLY = cb;
}
export function onSendJobMail(cb) {
  callbacks.JOB_MAIL = cb;
}
