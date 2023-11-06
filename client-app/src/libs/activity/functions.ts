import axios, { AxiosResponse } from "axios";
import { Activity } from "../../models/activity";

const URL = {
  getActivities: 'http://localhost:5000/api/activities',
  postActivity: 'http://localhost:5000/api/activities',
  getActivityById: (id: string) => `http://localhost:5000/api/activities/${id}`,
  putActivityById: (id: string) => `http://localhost:5000/api/activities/${id}`,
  deleteActivityById: (id: string) => `http://localhost:5000/api/activities/${id}`,
}

export const getActivities = async (): Promise<Activity[]> => {
    try {
      const response: AxiosResponse<Activity[]> = await axios.get(URL.getActivities);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch activities: ${error.message}`);
    }
}

export const getActivityById = async (id: string): Promise<Activity> => {
  try {
    const response: AxiosResponse<Activity> = await axios.get(URL.getActivityById(id));
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch activities: ${error.message}`);
  }
}

export const putActivityById = async (activity: Activity): Promise<Activity> => {
  try {
    const response: AxiosResponse<Activity> = await axios.put(URL.putActivityById(activity.id), activity);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch activities: ${error.message}`);
  }
}

export const postActivity = async (activity: Activity): Promise<Activity> => {
  try {
    const response: AxiosResponse<Activity> = await axios.post(URL.postActivity, activity);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch activities: ${error.message}`);
  }
}


export const deleteActivity = async (id: string): Promise<Activity> => {
  try {
    const response: AxiosResponse<Activity> = await axios.delete(URL.getActivityById(id));
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch activities: ${error.message}`);
  }
}