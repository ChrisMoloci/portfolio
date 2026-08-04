import {createContext} from "react";
import type {User} from "../types/User.ts";
import type {Credentials} from "../types/Credentials.ts";

type AuthContextType = {
    user?: User,
    isAuthenticated: boolean,
    isLoading: boolean,
    login: (credentials: Credentials) => void,
    logout: () => void,
}

const AuthContext = createContext<AuthContextType>({
    user: undefined,
    isAuthenticated: false,
    isLoading: false,
    login: () => {},
    logout: () => {},
});

export default AuthContext;

