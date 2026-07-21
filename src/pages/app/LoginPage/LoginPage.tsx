import styles from "./LoginPage.module.css";
import {useContext, useEffect} from "react";
import AuthContext, {type Credentials} from "../../../context/AuthContext.ts";
import {useNavigate} from "react-router";

function LoginPage() {
    const { login, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // If user is already authenticated, navigate to home page
        if (isAuthenticated) {
            console.log("User already authenticated, redirecting to home page")
            navigate('/', { replace: true })
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

        // Send credentials object to API
        login(credentials);
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

                    <button type="submit">Login</button>
                </form>
            </div>
        </main>
    )
}

export default LoginPage;