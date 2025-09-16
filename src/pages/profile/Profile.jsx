import { Form, Image, Input, Button } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Logo from "../../assets/Logo.jpg"
import { logoutApp } from "../../../redux/slices/authSlice"

import { useNavigate } from 'react-router-dom';


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector, } from 'react-redux';

import { updateProfile } from "../../../redux/thunks/emailThunk"
import { useEffect } from 'react';
import {getUser} from "../../../redux/thunks/authThunk"

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const userDetail=useSelector((state)=>state?.user?.userDetail?.user)

    console.log(" userDetail userDetail userDetail",userDetail);
    

    useEffect(()=>{
        dispatch(getUser())
    },[dispatch])

    useEffect(() => {
    if (userDetail) {
        form.setFieldsValue({
            name: userDetail.name,
            email: userDetail.email,
            bio: userDetail.bio,
        });
    }
}, [userDetail, form]);
    

    const handleInbox = () => {
        navigate("/dashboard")
    }

    const handleLogout = () => {
        toast.warning("Logged out successfully!");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isAuthenticated");
        dispatch(logoutApp())
        navigate("/login");
    }

    const handleupdate = (values) => {

        dispatch(updateProfile(values))
    }
    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center">
            {/* Logo Row */}
            <div className="w-full flex items-center p-2 px-7 mb-10 bg-green-500">
                <div className="w-full flex items-center bg-green-500 cursor-pointer" onClick={handleInbox}>
                    <Image
                        src={Logo}
                        style={{ width: "50px" }}
                        preview={false}
                    />
                    <h2 className="pl-3 text-xl text-white font-semibold">Email</h2>


                </div>

                <button className='ml-auto pl-5 pr-5 text-white font-semibold hover:text-green-950' onClick={handleInbox}>Inbox</button>


                <button className='px-5 bg-red-600 py-1 rounded-lg font-semibold text-white hover:bg-green-900' onClick={handleLogout}>Logout</button>
            </div>

            {/* Profile Card */}
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-1">User Profile</h2>
                <h3 className="text-gray-500 mb-6">
                    Manage your profile settings and personal information.
                </h3>

                <Form  form={form} layout="vertical" autoComplete="off" requiredMark={false}
                    onFinish={handleupdate}
                >
                    <Form.Item
                        label={
                            <span className="text-base">
                                Full Name <span className="text-red-500">*</span>
                            </span>
                        }
                        name="name"
                        rules={[{ required: true, message: "Please enter your full name" }]}
                    >
                        <Input placeholder="Full name" className="text-base bg-white" />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span className="text-base">
                                Email <span className="text-red-500">*</span>
                            </span>
                        }
                        name="email"
                        rules={[{ required: true, message: "Please enter your email" }]}
                    >
                        <Input
                            placeholder="Email"
                            className="text-base bg-white"
                            readOnly
                        />
                    </Form.Item>

                    <Form.Item label="Bio" name="bio" >
                        <TextArea placeholder="Bio" className="text-base bg-white" rows={4} />
                    </Form.Item>

                    <div>

                    </div>

                    <Form.Item className="flex justify-end gap-3">
                        <button
                            type="button"
                            className="bg-gray-500 text-white text-lg py-2 px-5 mr-5 mt-4 font-medium transition rounded-md hover:bg-gray-600"
                            onClick={handleInbox}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white text-lg py-2 px-5 mt-4 font-medium transition rounded-md hover:bg-green-700"
                        >
                            Save changes
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};


export default Profile
