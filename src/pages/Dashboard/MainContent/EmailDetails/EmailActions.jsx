import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Archive, Trash2, ChevronLeft, ChevronRight, Reply, Forward } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { viewedMail } from "../../../../../redux/thunks/emailThunk"
import { Tooltip } from "antd";

import { deleteMail, archive } from "../../../../../redux/thunks/emailThunk"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DeleteModal } from "../../../../common/popups/Delete"

const EmailDetailView = ({ email, onBack, onReply, onForward }) => {
  const dispatch = useDispatch()
  const [deleteSelectedMail, setDeleteSelectedMail] = useState(null)

  const viewedRef = useRef(new Set());



  useEffect(() => {
    if (email?._id && !viewedRef.current.has(email._id)) {
      dispatch(viewedMail(email._id));
      viewedRef.current.add(email._id); // mark as already viewed
    }
  }, [dispatch, email?._id]);

  const archiveMail = (id) => {
    dispatch(archive(id)).unwrap()
      .then(() => {
        onBack()
        toast.success("Email archived sucessfully")

      })
      .catch((err) => {
        console.error("archive failed:", err);
      });
  }

  const deleteEmail = (id) => {
    dispatch(deleteMail(id))
      .unwrap()
      .then(() => {
        onBack()
        toast.success("Email deleted sucessfully")
      })
      .catch((err) => {
        console.error("Delete failed:", err);
      });
  };

  const deleteEmailPopup = (id) => {
    setDeleteSelectedMail(id)
  };


  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <p className="text-lg">Select an email to view</p>
          <p className="text-sm mt-2">Choose an email from the list to read its contents</p>
        </div>
      </div>
    );
  }


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex-1 bg-green-50 text-black flex flex-col">
      {/* Header */}
      <div className="bg bg-green-300 text-black p-4">
        <div className="flex items-center justify-between">
          {/* Left side buttons */}
          <div className="flex items-center justify-between">
            <Tooltip title="Back to inbox">
              <button
                onClick={onBack}
                className="p-2 hover:bg-green-600 rounded-md hover:shadow-lg hover:-translate-y-0.5 
                   transition-all duration-200"
              >
                <ArrowLeft size={20} />
              </button>
            </Tooltip>

            <div className='ml-auto flex items-center gap-3'>

              <Tooltip title="Archive email">
                <button
                  className="p-2 hover:bg-green-600 rounded-md hover:shadow-lg hover:-translate-y-0.5 
                   transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    archiveMail(email._id);
                  }}
                >
                  <Archive size={20} />
                </button>
              </Tooltip>

              <Tooltip title="Delete email">
                <button
                  className="p-2 hover:bg-green-600 rounded-md hover:shadow-lg hover:-translate-y-0.5 
                   transition-all duration-200"
                  onClick={(e) => { e.stopPropagation(); deleteEmailPopup(email._id); }}
                >
                  <Trash2 size={20} />
                </button>
              </Tooltip>


            </div>


          </div>

          {/* Right side navigation */}
          {/* <div className="flex items-center gap-2">
            <Tooltip title="Previous email">
              <button
                className="p-2 hover:bg-green-600 rounded-md hover:shadow-lg hover:-translate-y-0.5 
                   transition-all duration-200"
              >
                <ChevronLeft size={20} />
              </button>
            </Tooltip>

            <Tooltip title="Next email">
              <button
                className="p-2 hover:bg-green-600 rounded-md hover:shadow-lg hover:-translate-y-0.5 
                   transition-all duration-200"
              >
                <ChevronRight size={20} />
              </button>
            </Tooltip>
          </div> */}
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto">
        <div className=" mx-auto p-6">
          {/* Email Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-black mb-4">
              {email.subject || "Project Update"}
            </h1>

            <div className="text-gray-600 text-sm space-y-1">
              <div>
                <span className="text-gray-800">From:</span> {email?.senderId?.email}
                {email?.senderId?.name && (
                  <span className="text-gray-800 ml-5 ">
                    {email?.senderId?.name}
                  </span>
                )}

                <span className="mx-2">|</span>
                <span className="text-gray-800">Date:</span> {formatDate(email.createdAt
                ) || "--"}
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="bg-green-300 rounded-lg p-6 text-black leading-relaxed">
            {email.content}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-gree-300 p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onReply}
            className="inline-flex items-center gap-2 bg-green-300 hover:bg-green-600 text-black px-4 py-2 rounded-md hover:shadow-lg hover:-translate-y-0.5 
               transition-all duration-200"
          >
            <Reply size={16} />
            Reply
          </button>

          <button
            onClick={onForward}
            className="inline-flex items-center gap-2 bg-green-300 hover:bg-green-600 text-black px-4 py-2 rounded-md hover:shadow-lg hover:-translate-y-0.5 
               transition-all duration-200"
          >
            <Forward size={16} />
            Forward
          </button>
        </div>
      </div>

      {deleteSelectedMail &&
        <DeleteModal
          open={!!deleteSelectedMail}
          header="Delete Email"
          message="Are you sure you want to delete this email?"
          onCancel={() => setDeleteSelectedMail(null)}
          onConfirm={() => {
            deleteEmail(deleteSelectedMail);
            setDeleteSelectedMail(null);
          }}
        />
      }
    </div>
  );
};

export default EmailDetailView
