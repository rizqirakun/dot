import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const AUTH_URL = process.env.REACT_APP_AUTH_URL || "";

    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
    });
    const { email, password, username } = inputValue;
    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err: string) =>
        toast.error(err, {
            position: "top-right",
            hideProgressBar: true
        });
    const handleSuccess = (msg: string) =>
        toast.success(msg, {
            position: "top-right",
            hideProgressBar: true
        });

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${AUTH_URL}register`,
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                console.log('success', message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                console.log('error', message);
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
            username: "",
        });
    };

    return (
        <>
            <div className="form-container">
                <h2>Register Account</h2>
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
                        <label htmlFor="email">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Enter your username"
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
                    <button type="submit">Submit</button>
                    <span>
                        Already have an account? <Link to={"/login"}>Login</Link>
                    </span>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default Register;