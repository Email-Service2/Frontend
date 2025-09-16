
import { Input, Dropdown, Menu, Image } from 'antd'
// import Avatar from '../assets/avatar.png';
import Avatar from "../../../assets/avatar.png";
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { logoutApp } from "../../../../redux/slices/authSlice"

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const Search = ({active , onSearch}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [query, setQuery] = useState(""); // 🔹 local state
  const [debouncedQuery, setDebouncedQuery] = useState(""); // 🔹 debounced value

  console.log("active active Search",active);
  

  // Debounce logic: update debouncedQuery after 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Call API when debouncedQuery changes
  // useEffect(() => {
  //   if (debouncedQuery.trim() !== "") {
  //     dispatch(emails({ activeFolder: active, query: debouncedQuery }));
  //   } else {
  //     dispatch(emails({ activeFolder: active }));
  //   }
  // }, [debouncedQuery, dispatch,active]);

  useEffect(() => {
    onSearch(debouncedQuery); // Notify parent
  }, [debouncedQuery, onSearch]);


  const handleProfileMenuClick = ({ key }) => {
    if (key === "logout") {
      console.log("Logging out...");
      toast.warning("Logged out successfully!");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isAuthenticated");
      dispatch(logoutApp())
      navigate("/login");
    } else if (key === "profile") {
      console.log("Go to profile page...");
      navigate("/profile");
    }
  };


  const profileMenu = (

    <Menu
      onClick={handleProfileMenuClick}
      items={[
        {
          label: "Profile",
          key: "profile",
          icon: <UserOutlined />,
          className: "hover:!bg-green-100 hover:shadow-lg hover:-translate-y-0.5                transition-all duration-200"
        },
        {
          label: "Logout",
          key: "logout",
          icon: <LogoutOutlined />,
          danger: true,
          className: "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        },
      ]}
    />
  );
  return (
    <div className='w-full flex justify-between items-center p-0 pr-4'>
      <Input
        placeholder="Search by subject"
        allowClear
        onChange={(e) => setQuery(e.target.value)} 
        className=' hover:shadow-lg hover:-translate-y-0.5 
               transition-all duration-200 mr-4'

      />
      <Dropdown overlay={profileMenu} placement="bottomRight" trigger={["click"]} className='mr-5hover:shadow-xl hover:-translate-y-0.5 
               transition-all duration-200'>
        <Image
          src={Avatar}
          preview={false}
          width={32}
          className="w-12 h-12 rounded-full object-cover hover:cursor-pointer hover:opacity-80 "
        />
      </Dropdown>
    </div>
  )
}

export default Search