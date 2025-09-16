import React from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import "../../pages/style.css";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-green-50">

            {/* Signup Card */}
            <div className="bg-white w-[80%] sm:w-[80%] md:w-[35%] shadow-lg rounded-2xl p-10">
                <h2 className="text-3xl text-red font-semibold font-inter text-center mb-2 text-gray-900">Forgot your password?</h2>
                <h5 className="text-sm mb-4 text-center font-inter text-gray-500">Enter the email address associated with your account, and we'll send you a link to reset your password.</h5>
                <Form
                    layout="vertical"
                    // onFinish={handleSignup}
                    autoComplete="off"
                    requiredMark={false}
                >
                    <Form.Item
                        // label={<span className="text-base">Email <span className="text-red-500">*</span></span>}
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email" },
                            { type: "email", message: "Please enter a valid email" }
                        ]}
                    >
                        <Input placeholder="Email address" className="text-base bg-white" />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" block className="bg-green-600 w-full text-lg button py-5 mt-4 font-medium transition rounded-md">
                            Send reset link
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
                        Remember your password?{" "}
                        <span
                            onClick={handleLogin}
                            className="text-green-600 font-medium cursor-pointer hover:underline">
                            Log in
                        </span>

                    </p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword