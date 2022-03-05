import { User } from './../models/UserDTO';

import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const TOKEN_COOKIE = "drinksIHadToken";

const DOMAIN: string = window.location.protocol + "//" + window.location.hostname + ":3001/api/";

function getUrl(url: string): string {
    return DOMAIN + url;
}

interface AxiosOptions {
    headers?: any,
    body?: object
}

function getToken(): string {
    return cookies.get(TOKEN_COOKIE);
}

function getOptions(): AxiosOptions {
    let options: AxiosOptions = {};
    if (cookies.get(TOKEN_COOKIE)) {
        options.headers = {
            'Authorization': "Bearer " + getToken()
        }
    }
    return options;
}

function currentUser(): User | null {
    var token: string = getToken();
    if (!token) { return null; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)).user;
}

function setToken(token: string) {
    cookies.set(TOKEN_COOKIE, token, { path: "/" });
}

function getCall(url: string, body?: object): Promise<any> {
    return axios.get(getUrl(url), getOptions());
}

function postCall(url: string, body?: object): Promise<any> {
    return axios.post(getUrl(url), body, getOptions());
}

function putCall(url: string, body?: object): Promise<any> {
    return axios.put(getUrl(url), body, getOptions());
}

function deleteCall(url: string, body?: object): Promise<any> {
    return axios.delete(getUrl(url), getOptions());
}

const ApiService = {
    currentUser: currentUser,
    setToken: setToken,
    getCall: getCall,
    postCall: postCall,
    putCall: putCall,
    deleteCall: deleteCall
}

export default ApiService;