/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { message } from "antd";
import "../../App.css";

const Login = () => {
    const { user, loginUser } = useAuth();
    const navigate = useNavigate();

    // Placeholder for formData and handleChange
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Placeholder for newErrors
    const [newErrors, setnewErrors] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        // Update formData when input values change
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Check for presence of email
        if (!formData.email) {
            isValid = false;
            newErrors.email = "Please enter your email address.";
        } else {
            // Check for valid email format using a regular expression
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                isValid = false;
                newErrors.email = "Please enter a valid email address.";
            }
        }

        // Check for presence of password
        if (!formData.password) {
            isValid = false;
            newErrors.password = "Please enter your password.";
        }

        setnewErrors(newErrors);
        return isValid;
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submitting
        if (validateForm()) {
            const email = formData.email;
            const password = formData.password;

            const userInfo = { email, password };

            const check = await loginUser(userInfo);
            if (check) {
                message.success("Login successful");
            } else {
                message.error("Login failed. Please check your credentials.");
            }
        }
    };

    return (
        <div className="flex h-screen bg-slate-800">
            <div className="login-container bg-gray-900 p-6 rounded-lg shadow-md ">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Sign in to your account
                    <div>
                        {newErrors.login && (
                            <p className="mt-2 text-red-500 text-sm">
                                {newErrors.login}
                            </p>
                        )}
                    </div>
                </h2>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-white "
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                onChange={handleChange}
                                value={formData.email}
                                className="block w-full p-2 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {newErrors.email && (
                            <p className="mt-2 text-red-500 text-sm">
                                {newErrors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                onChange={handleChange}
                                value={formData.password}
                                className="block w-full rounded-md border-0 py-1.5  p-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {newErrors.password && (
                            <p className="mt-2 text-red-500 text-sm">
                                {newErrors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-white">
                    Dont have an account?
                    <Link
                        to="/Signup"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        SignUp here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
