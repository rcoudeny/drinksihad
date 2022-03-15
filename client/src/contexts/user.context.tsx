import React, { useReducer } from "react";
import { User } from "../models/UserDTO";
import ApiService from "../service/api.service";

interface UserState {
    user: User | null
}

enum UserActionType {
    LOGOUT = "LOGOUT",
    LOGIN = "LOGIN"
}

interface UserAction {
    type: UserActionType,
    payload: User | null
}

function userReducer(state: UserState, action: UserAction) {
    const { type, payload } = action;
    switch (type) {
        case UserActionType.LOGIN:
            return { user: payload }
        case UserActionType.LOGOUT:
            ApiService.setToken("");
            return { user: null }
        default: return state;
    }
}

const initialState = { user: ApiService.currentUser() }

interface UserContextValue {
    state: UserState;
    dispatch: React.Dispatch<UserAction>
}

const UserContext: React.Context<UserContextValue> = React.createContext({
    state: initialState,
    dispatch: (action) => console.error("Dispatched action outside of an UserContext provider", action)
});

function UserProvider(props: { children: JSX.Element[] | JSX.Element }) {
    const [state, dispatch] = useReducer(userReducer, initialState);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider, UserActionType };