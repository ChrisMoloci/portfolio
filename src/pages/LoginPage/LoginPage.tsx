import styles from "./LoginPage.module.css";

function LoginPage() {
    return (
        <main className={styles.loginPage}>
            <div className={styles.formContainer}>
                <h1>Login</h1>
                <form className={styles.loginForm} action="">
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