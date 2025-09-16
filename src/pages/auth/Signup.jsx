import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Radio, Checkbox } from "antd";
import { useEffect } from "react";
import "../../pages/Style.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {signupUser} from "../../../redux/thunks/authThunk";
import { useDispatch, useSelector} from "react-redux";

const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {  error, success } = useSelector((state) => state?.user);

  // const handleSignup = async (values) => {
  //   try {
  //     console.log("Signup values:", values);

  //     const res = await axios.post(
  //       `${BASE_URL}/api/user/signup`,
  //       values,
  //       { headers: { "Content-Type": "application/json" } }
  //     );

  //     console.log("Full Response:", res);
  //     console.log("Success type:", typeof res.data.success);

  //     if (res.status === 201 && res.data.success === true) {

  //       toast.success("Signup successful! Redirecting to Dashboard...");
  //       navigate("/dashboard");
  //     }
  //     else if (res.status === 200 && res.data.success === false) {
  //       toast.error("Email already exists. Please Login.");
  //     }
  //     else {
  //       toast.error("Unexpected response.");
  //     }
  //   } catch (error) {
  //     console.error("Signup error:", error);
  //     toast.error("Server error, please try again.");
  //   }
  // };

  useEffect(() => {
    if (success) {
      toast.success("Signup successful! Redirecting to Dashboard...");
      navigate("/dashboard");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, navigate]);

  const handleSignup = (values) => {
    dispatch(signupUser(values));
  };

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-green-50">

      {/* Signup Card */}
      <div className="bg-white w-[80%] sm:w-[80%] md:w-[35%] shadow-lg rounded-2xl p-10">
        <h2 className="text-3xl text-red font-semibold font-inter text-center mb-2 text-gray-900">Create your account</h2>
        <h5 className="text-sm mb-4 text-center font-inter text-gray-500">Start your journey with our secure email service.</h5>
        <Form
          layout="vertical"
          onFinish={handleSignup}
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

          <Form.Item
            label={<span className="text-base">Confirm Password <span className="text-red-500">*</span></span>}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" className="text-base" />
          </Form.Item>

          {/* <Checkbox>
            I agree to the <span className="text-gray-600 cursor-pointer font-semibold hover:text-gray-800">Terms and Conditions</span>
          </Checkbox> */}

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must agree before submitting")),
              },
            ]}
          >
            <Checkbox>
              I agree to the{" "}
              <span className="text-gray-600 cursor-pointer font-semibold hover:text-gray-800">
                Terms and Conditions
              </span>
            </Checkbox>
          </Form.Item>


          <Form.Item>
            <Button htmlType="submit" block className="bg-green-600 w-full text-lg button py-5 mt-4 font-medium transition rounded-md">
              Create account
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
            Have an account?{" "}
            <span
              onClick={handleLogin}
              className="text-green-600 font-medium cursor-pointer hover:underline">
              Login
            </span>

          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
