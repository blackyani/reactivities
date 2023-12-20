import {User, UserFormValues} from "../models/user";
import {makeAutoObservable, runInAction} from "mobx";
import auth from "../api/auth";
import {store} from "./store";
import {router} from "../router/Routes";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn () {
        return !!this.user;
    }

    login = async (creds: UserFormValues)=> {
        try {
            const user = await auth.login(creds);
            store.commonStore.setToken(user.token);
            store.commonStore.setAppLoaded();
            store.modalStore.closeModal()
            runInAction(() => this.user = user);
            router.navigate('/activities');
            store.modalStore.closeModal()
        } catch (error) {
            throw error;
        }
    }

    register = async (creds: UserFormValues)=> {
        try {
            const user = await auth.register(creds);
            store.commonStore.setToken(user.token);
            store.commonStore.setAppLoaded();
            store.modalStore.closeModal()
            runInAction(() => this.user = user);
            router.navigate('/activities');
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await auth.current();
            runInAction(() => {
                this.user = user;
            });
        } catch (error) {
            console.error(error);
        }
    }
}