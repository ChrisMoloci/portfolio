import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext.ts";
import {useNavigate} from "react-router";

function Logout() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [ errorText, setErrorText ] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                await logout();
                navigate('/login');
            } catch (error: any) {
                setErrorText(error.message);
            }
        })();
    }, []);

    return (
        <>
            <title>Logout</title>
            {errorText &&
                <p className={"errorText"}>{errorText}</p>
            }
            {!errorText &&
                <p>Logging out...</p>
            }
        </>
    )
}

export default Logout;