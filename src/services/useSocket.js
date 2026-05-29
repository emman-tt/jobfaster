import { toast } from 'sonner'
import { toastPresets } from '../components/toasters'
import { getToken } from '../libs/token'

let ws = null
let isConnecting = false

const callbacks = {
  JOB_APPLY: null,
  JOB_MAIL: null
}

const pendingPromises = {}

export function connector () {
  if (ws && ws.readyState === WebSocket.OPEN) {
    return
  }

  if (ws && ws.readyState === WebSocket.CONNECTING) {
    return
  }

  if (ws && ws.readyState === WebSocket.CLOSED) {
    ws = null
  }

  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5000'
  ws = new WebSocket(`${wsUrl}?accessToken=${getToken()}`)

  ws.onopen = () => {
    isConnecting = true
  }

  ws.onmessage = event => {
    const res = JSON.parse(event.data)
    const type = res.type

    if (pendingPromises[type]) {
      pendingPromises[type](res)
      delete pendingPromises[type]
    }

    if (callbacks.JOB_MAIL && type == 'JOB_MAIL') {
      return callbacks.JOB_MAIL(res)
    }

    if (callbacks.JOB_APPLY && type == 'JOB_APPLY') {
      return callbacks.JOB_APPLY(res)
    }
  }

  ws.onerror = error => {
    console.error('Error:', error)
    toast.dismiss('ai-processing')
    toast.error('AI Error', {
      id: 'ai-socket-error',
      ...toastPresets.aiError()
    })
  }

  ws.onclose = () => {
    ws = null
    Object.keys(pendingPromises).forEach(key => {
      pendingPromises[key]({ status: 'failed', error: 'Connection closed' })
      delete pendingPromises[key]
    })
  }
}

export function sendMessage (type, data) {
  if (ws && ws.readyState === WebSocket.CLOSED) {
  }

  if (!ws || ws.readyState !== WebSocket.OPEN) {
    toast.error('Connection Lost', {
      id: 'connection-lost',
      ...toastPresets.aiError(
        "We couldn't start the process. Please check your connection and try again."
      ),
      position: 'top-right'
    })
    console.error('Not connected', ws?.readyState)
    return false
  }

  if (type == 'JOB_APPLY') {
    toast.loading('Tailoring Resume', {
      ...toastPresets.aiProcessing(),
      description:
        'Generating a tailored resume and and email template for the job',
      id: 'ai-processing',
      position: 'top-right',
      duration: Infinity
    })
  }
  if (type == 'JOB_MAIL') {
    toast.loading('Processing and sending mail!', {
      ...toastPresets.aiProcessing(),
      id: 'job-mail',
      position: 'top-right',
      description: 'On success, email will be recieved by the hiring address',
      duration: Infinity
    })
  }

  ws.send(JSON.stringify({ type, data }))

  return new Promise(resolve => {
    pendingPromises[type] = res => {
      resolve(res)
      if (callbacks[type]) {
        callbacks[type](res)
      }
    }
  })
}

export function onJobApply (cb) {
  callbacks.JOB_APPLY = cb
}
export function onSendJobMail (cb) {
  callbacks.JOB_MAIL = cb
}
