import { requests } from "./agent";
import {User, UserFormValues} from "../models/user";

export default {
    current: () => requests.get<User>('/account'),
    login: (body: UserFormValues) => requests.post<User>('/account/login', body),
    register: (body: UserFormValues) => requests.post<User>('/account/register', body),
}