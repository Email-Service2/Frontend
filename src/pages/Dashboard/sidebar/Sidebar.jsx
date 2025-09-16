import React, { useEffect, useState } from "react";
import { Inbox, Send, FileText, Trash2, Archive, AlertCircle, Star, Pencil } from "lucide-react";
import { X, Paperclip } from 'lucide-react';
import { useDispatch } from "react-redux";
import { sendEmail } from "../../../../redux/thunks/emailThunk"
import { Image } from "antd"

import Logo from "../../../assets/logo.jpg"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = ({ active, onSelect, data, open, close }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();


    const [to, setTo] = useState("");
    const [cc, setCc] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const topMenu = [
        { id: "inbox", label: "Inbox", icon: <Inbox size={18} /> },
        { id: "sent", label: "Sent", icon: <Send size={18} /> },

        { id: "important", label: "Important", icon: <Star size={18} /> },
    ];

    const bottomMenu = [
        // { id: "spam", label: "Spam", icon: <AlertCircle size={18} /> },
        { id: "trash", label: "Trash", icon: <Trash2 size={18} /> },
        { id: "archive", label: "Archive", icon: <Archive size={18} /> },
    ];

    const renderMenu = (items) =>
        items.map((item) => (
            <button
                key={item.id}
                onClick={() => onSelect(item.label)}
                className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 
          ${active === item.label
                        ? "bg-green-200 hover:shadow-2xl text-green-700 hover:-translate-y-1"
                        : "text-gray-600 hover:shadow-2xl hover:bg-green-100 hover:-translate-y-1"
                    }`}
            >
                {item.icon}
                <span className="ml-3">{item.label}</span>
            </button>
        ));

    const handleCompose = () => {
        setModalOpen(true);
    }
    useEffect(() => {
        if (data) {
            setTo(data.to || "");
            setCc(data.cc || "");
            setSubject(data.subject || "");
            setBody(data.body || "");
        }
    }, [data])

    const onClose = () => {
        setModalOpen(false);
        setTo("")
        setCc("")
        setSubject("")
        setBody("")
        if (typeof close === "function") {
            close();
        }
    }

    const handleSendEmail = () => {
        const emailData = {
            to,
            cc,
            subject,
            body,
        };

        // dispatch(sendEmail(emailData));
        dispatch(sendEmail(emailData))
            .unwrap() // lets you use try/catch with thunks
            .then(() => {
                toast.success("Email sent successfully!");
                onClose();
            })
            .catch(() => {
                toast.error("Failed to send email.");
            });
        onClose()
    };




    return (
        <div className="flex flex-col w-60 sm:w-56 md:w-60 h-screen border-r border-gray-100 bg-white">
            {/* App Title */}
            <div className="p-4 font-bold text-2xl text-green-700 flex items-center gap-2">
                <Image
                    src={Logo}
                    width={40} // or className="w-10"
                    preview={false}
                />
                <span>Email</span>
            </div>

            {/* Top Menu */}
            <nav className="flex-1 px-2 space-y-1">
                {renderMenu(topMenu)}

                {/* Divider */}
                <div className="py-7">
                    <hr className="border-gray-100" />
                </div>

                {renderMenu(bottomMenu)}
            </nav>

            {/* Compose Button */}
            {/* <div className="p-4">
                <button onClick={handleCompose} className="flex items-center justify-center w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
                    <Pencil size={16} className="mr-2" /> Compose
                </button>
            </div> */}

            <div className="p-4">
                <button
                    onClick={handleCompose}
                    className="flex items-center justify-center w-full py-2 bg-green-600 text-white rounded-lg font-medium 
               hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 
               transition-all duration-200"
                >
                    <Pencil size={16} className="mr-2" /> Compose
                </button>
            </div>


            {/* Compose Modal */}
            {(modalOpen || open) && (

                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                    <div className="bg-white rounded-lg w-[600px] max-w-[90vw] max-h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">New Message</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-1 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-0">
                            {/* To Field */}
                            <div className="p-4">


                                <div className="flex items-center border-b border-gray-200 py-3">
                                    <label className="text-sm text-gray-600 w-16 flex-shrink-0">To</label>
                                    <input
                                        type="text"
                                        placeholder="Recipients"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        className="flex-1 text-sm text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent"
                                    />
                                </div>

                                {/* Cc/Bcc Field */}
                                <div className="flex items-center border-b border-gray-200 py-3">
                                    <label className="text-sm text-gray-600 w-16 flex-shrink-0">Cc/Bcc</label>
                                    <input
                                        type="text"
                                        value={cc}
                                        onChange={(e) => setCc(e.target.value)}
                                        className="flex-1 text-sm text-gray-900 border-none outline-none bg-transparent"
                                    />
                                </div>

                                {/* Subject Field */}
                                <div className="flex items-center border-b border-gray-200 py-3">
                                    <label className="text-sm text-gray-600 w-16 flex-shrink-0">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="What's the subject?"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="flex-1 text-sm text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent"
                                    />
                                </div>

                                {/* Message Body */}
                                <div className="pt-4">
                                    <textarea
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        className="w-full h-40 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Write your message here..."
                                    ></textarea>
                                </div>

                            </div>

                            {/* Footer Actions */}
                            <div className="flex p-4 items-center justify-between pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                    <button onClick={handleSendEmail} className="inline-flex items-center gap-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition px-4 py-2">
                                        <Send size={16} />
                                        Send
                                    </button>
                                    <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                                        <Paperclip size={18} />
                                    </button>
                                </div>
                                <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
