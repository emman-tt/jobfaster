import { api } from "../libs/axios";

export async function fetchSettings(data) {
  const res = await api.get("settings", {
    data,
  });

  return res.data.data;
}
export async function updateProfile(data) {
  const res = await api.patch("settings/profile", data, {
    timeout: 20000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
export async function updateNotification(data) {
  const res = await api.patch("settings/notification", data);

  return res.data;
}
export async function updateActivity(data) {
  const res = await api.patch("settings/activity", {
    data,
  });

  return res.data;
}
