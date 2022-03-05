import React from "react";
import { User } from "../../models/UserDTO";

export interface UserContextInterface {
    user: User | null,
    logout: () => void,
    login: (user: User) => void
}

export const UserContext: React.Context<UserContextInterface> = React.createContext<UserContextInterface>({
    user: null,
    logout: function () { },
    login: function (user: User) { }
});