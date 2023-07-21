import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from 'typescript-cookie';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const cookieName = 'token';
    const AUTH_URL = process.env.REACT_APP_AUTH_URL || "";

    const handleVerify = (name: string) => {
        toast(`Welcome back "${name}" 👋`, {
            position: "top-right",
            hideProgressBar: true
        })
    }
    useEffect(() => {
        const verifyCookie = async () => {
            if (!getCookie(cookieName)) {
                navigate("/login");
            }
            const { data } = await axios.post(
                AUTH_URL,
                {},
                { withCredentials: true }
            );
            const { status, name } = data;
            setName(name);
            return status
                ? handleVerify(name)
                : (removeCookie(cookieName), navigate("/login"));
        };
        verifyCookie();
    }, [AUTH_URL, navigate]);
    const Logout = () => {
        removeCookie(cookieName);
        navigate("/login");
    };
    return (
        <>
            <div className="homepage">
                <h4>
                    {" "}
                    Welcome <span>{name}</span>
                </h4>
                <button onClick={Logout}>LOGOUT</button>
            </div>
            <ToastContainer />
        </>
    );
};

export default Home;