import axios, { AxiosResponse } from "axios";
import { Activity } from "../../models/activity";
import { url } from "inspector";
import { sleep } from "../utility.functions";
import { error } from "console";

axios.defaults.baseURL = 'http://localhost:5000/api'

const resposeBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000)
    return response;
  } catch(error) {
    return Promise.reject(error)
  }
})

const requests = {
  get: <T> (url: string) => axios.get<T>(url).then(resposeBody),
  post: <T> (url: string, body: Activity) => axios.post<T>(url, body).then(resposeBody),
  put: <T> (url: string, body: Activity) => axios.put<T>(url, body).then(resposeBody),
  delete: <T> (url: string) => axios.delete<T>(url).then(resposeBody),
}

const activities = {
  list: () => requests.get<Activity[]>('/activities'),
  create: (body: Activity) => requests.post<void>('/activities', body),
  update: (body: Activity) => requests.put<void>(`/activities/${body.id}`, body),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  remove: (id: string) => requests.delete<void>(`/activities/${id}`),
}

export const agent = {
  activities
}