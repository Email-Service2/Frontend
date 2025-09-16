// src/common/popups/Delete.jsx
import { Modal, Button } from "antd";
import { Trash2 } from "lucide-react";
import React from "react";

export const DeleteModal = ({ open, onCancel, onConfirm, header, message }) => {
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            closeIcon
            styles={{
                body: { textAlign: "center", paddingTop: "16px"  },
            }}
            className="Green-border-modal"
            width={"450px"}
        >
            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100">
                    <Trash2 size={24} className="text-red-500" />
                </div>
            </div>
                <h2 className="text-xl ml-3 font-semibold text-gray-800">{header}</h2>

            {/* Message */}
            <p className="text-gray-600 text-lg mb-6">{message}</p>

            {/* Buttons */}
            <div className="flex justify-center space-x-4">
                <Button
                    onClick={onCancel}
                    className="border-red-500 px-5 py-5 w-full text-red-500 cancelButton"
                >
                    Cancel
                </Button>
                <Button type="primary" danger onClick={onConfirm}
                 className="px-5 py-5 w-full"
                >
                    Delete
                </Button>
            </div>
        </Modal>
    );
};
