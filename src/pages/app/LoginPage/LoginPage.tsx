import styles from "./LoginPage.module.css";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext.ts";
import {useLocation, useNavigate} from "react-router";
import type {Credentials} from "../../../types/Credentials.ts";

function LoginPage() {
    const [ errorText, setErrorText ] = useState<string>("");
    const { login, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // If user was redirected here from a protected route, we will redirect them back after login
    const fromLocation = location.state?.from;
    const from = fromLocation?.pathname || "/";

    useEffect(() => {
        // If user is already authenticated, navigate to home page
        if (isAuthenticated) {
            console.log("User already authenticated, redirecting to home page")
            navigate(from, { replace: true })
        }
    }, [isAuthenticated]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData: FormData = new FormData(e.currentTarget);

        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            return;
        }

        // Create a credentials object that complies with what the backend needs
        const credentials: Credentials = {
            email: email.toString(),
            password: password.toString(),
        };

        try {
            // Send credentials object to API
            await login(credentials);
        } catch (error: any) {
            setErrorText(error.response ? error.response.data.message : error.message);
        }
    }

    return (
        <main className={styles.loginPage}>
            <div className={styles.formContainer}>
                <h1>Login</h1>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <label htmlFor="email">email:
                        <input type="email" name="email" id="email" placeholder={"example@example.com..."}/>
                    </label>

                    <label htmlFor="password">Password:
                        <input type="password" name="password" id="password" placeholder={"password..."}/>
                    </label>

                    {errorText &&
                        <p className={"errorText"}>{errorText}</p>
                    }

                    <button type="submit">Login</button>
                </form>
            </div>
        </main>
    )
}

export default LoginPage;