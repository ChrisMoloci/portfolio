import {createContext} from "react";

export type User = {
    id: number,
    email: string,
}

export type Credentials = {
    email: string,
    password: string,
}

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

