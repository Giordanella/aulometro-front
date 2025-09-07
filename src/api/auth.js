import api from "./axios";

export async function loginRequest(email, password) {
  const { data } = await api.post("/login", { email, password });
  return data; // { message, user?, token? }
}
