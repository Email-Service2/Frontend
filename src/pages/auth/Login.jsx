import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Radio, Checkbox } from "antd";
import { useDispatch, useSelector} from "react-redux";
import "../../pages/style.css";
import { userLogin } from "../../../redux/thunks/authThunk";

import {setAccessToken, setAuthenticated} from "../../../redux/slices/authSlice"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { login,success,error } = useSelector((state) => state.user);

    console.log("Login user from Redux state:hrrrr", login?.user);

    useEffect(() => {
        if (success) {
            toast.success("Login successful");

            dispatch(setAccessToken(login?.token));
            dispatch(setAuthenticated(true));
            navigate("/dashboard");
        }
        if (error) {
            toast.error(error);
        }
    }, [success, error, navigate,login?.token,dispatch]);

    

    const handleSignup = () => {
        navigate("/");
    }

    const forgotPassword = () => {
        navigate("/forgot-password");
    }

    const handleLogin = (values) => {
        dispatch(userLogin(values));
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-green-50">

            {/* Signup Card */}
            <div className="bg-white w-[80%] sm:w-[80%] md:w-[35%] shadow-lg rounded-2xl p-10">
                <h2 className="text-3xl text-red font-semibold font-inter text-center mb-2 text-gray-900">
                    Welcome back
                </h2>
                <h5 className="text-sm mb-4 text-center font-inter text-gray-500">
                    Securely access your email anytime, anywhere.
                </h5>
                <Form
                    layout="vertical"
                    onFinish={handleLogin}
                    autoComplete="off"
                    requiredMark={false}
                >
                    <Form.Item
                        label={<span className="text-base">Email <span className="text-red-500">*</span></span>}
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email" },
                            { type: "email", message: "Please enter a valid email" }
                        ]}
                    >
                        <Input placeholder="Email" className="text-base bg-white" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-base">Password <span className="text-red-500">*</span></span>}
                        name="password"
                        rules={[{ required: true, message: "Please enter your password" }]}
                    >
                        <Input.Password placeholder="Password" className="text-base bg-white" />
                    </Form.Item>

                        <p className='hover:underline cursor-pointer text-right hover:text-green-800' onClick={forgotPassword}>Forgot password?</p>

                    <Form.Item>
                        <Button
                            htmlType="submit"
                            block
                            className="bg-green-600 button  text-lg py-5 mt-4 font-medium transition rounded-md hover:bg-green-700"
                        >
                            Login to your account
                        </Button>
                    </Form.Item>
                </Form>


                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-3 text-gray-500 text-sm">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Login link */}
                <div className="mt-0 text-center">
                    <p className="text-gray-600 ">
                        Don't have an account?{" "}
                        <span
                            onClick={handleSignup}
                            className="text-green-600 font-medium cursor-pointer hover:underline">
                            Sign up
                        </span>

                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login