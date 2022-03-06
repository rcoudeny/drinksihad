import { User } from './../models/UserDTO';

import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const TOKEN_COOKIE = "drinksIHadToken";

const DOMAIN: string = window.location.protocol + "//" + window.location.hostname + ":3001/api/";

interface AxiosOptions {
    headers?: any,
    body?: object
}

function getUrl(url: string): string {
    return DOMAIN + url;
}

function getToken(): string {
    return cookies.get(TOKEN_COOKIE);
}

function getOptions(): AxiosOptions {
    let options: AxiosOptions = {};
    if (cookies.get(TOKEN_COOKIE)) {
        options.headers = {
            'Authorization': "Bearer " + getToken(),
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
    }
    return options;
}

function axiosPromise(axiosPromise: Promise<any>) {
    return axiosPromise;
    // new Promise((resolve, reject) => {
    //     axiosPromise.then().catch();
    // });
}

const ApiService = {
    currentUser: function (): User | null {
        var token: string = getToken();
        if (!token) { return null; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64)).user;
    },
    setToken: function (token: string) {
        cookies.set(TOKEN_COOKIE, token, { path: "/" });
    },
    getCall: function (url: string, body?: object): Promise<any> {
        return axiosPromise(axios.get(getUrl(url), getOptions()));
    },
    postCall: function (url: string, body?: object): Promise<any> {
        return axiosPromise(axios.post(getUrl(url), body, getOptions()));
    },
    putCall: function (url: string, body?: object): Promise<any> {
        return axiosPromise(axios.put(getUrl(url), body, getOptions()));
    },
    deleteCall: function (url: string, body?: object): Promise<any> {
        return axiosPromise(axios.delete(getUrl(url), getOptions()));
    }
}

export default ApiService;