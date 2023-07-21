import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, EButtonKind } from "ui/dist/index";

const Login = () => {
    const navigate = useNavigate();
    const AUTH_URL = process.env.REACT_APP_AUTH_URL || "";

    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;
    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err: string) => {
        console.log(err);
        toast.error(err, {
            position: "top-right",
            hideProgressBar: true
        });
    }
    const handleSuccess = (msg: string) => {
        toast.success(msg, {
            position: "top-right",
            hideProgressBar: true
        });
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${AUTH_URL}login`,
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            console.log(data);
            const { success, message } = data;
            if (success) {
                handleSuccess("User login success");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
        });
    };

    return (
        <>
            <div className="form-container">
                <h2>Login Account</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={handleOnChange}
                        />
                    </div>

                    <Button kind={EButtonKind.PRIMARY} type="submit">Submit</Button>
                    <span>
                        Already have an account? <Link to={"/signup"}>Signup</Link>
                    </span>
                </form>
            </div >
            <ToastContainer />
        </>
    );
};

export default Login;