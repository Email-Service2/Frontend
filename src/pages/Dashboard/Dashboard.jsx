import { useEffect, useState, useCallback } from "react";
import { List, Tooltip, Spin, Skeleton } from "antd";
import { Star, Archive, Mail, MailOpen, Trash2 } from "lucide-react";
import EmailActions from "./MainContent/EmailDetails/EmailActions";
import { socket } from "../../socket"

import Sidebar from "./sidebar/Sidebar";
import Search from "./search/Search";

import { useDispatch, useSelector } from "react-redux";

import { emails, important, deleteMail, archive, updateRead, deleteParmanentaly } from "../../../redux/thunks/emailThunk";

import { toggleImportantLocal, toggleRead } from "../../../redux/slices/emailSlice"

import { DeleteModal } from "../../common/popups/Delete"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [selectedMail, setSelectedMail] = useState(null);
  const dispatch = useDispatch();

  const [deleteSelectedMail, setDeleteSelectedMail] = useState(null)
  const [searchQuery, setSearchQuery] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeData, setComposeData] = useState({ to: "", cc: "", subject: "", body: "" });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const email = useSelector((state) => state?.email?.email?.emails || []);
  const userId = useSelector((state) => state?.user?.login?.user?.id);

  console.log("userId", userId);

  const loading = useSelector((state) => state?.email?.emailLoading);



  const handleReply = (email) => {
    setComposeData({
      to: email?.senderId?.email || "",
      cc: "",
      subject: `Re: ${email.subject || ""}`,
      body: `\n\n--- Original Message ---\n${email.content || ""}`
    });
    setComposeOpen(true);
  };

  const handleForward = (email) => {

    setComposeData({
      to: "",
      cc: "",
      subject: `Fwd: ${email.subject || ""}`,
      body: `\n\n--- Forwarded Message ---\n${email.content || ""}`
    });
    setComposeOpen(true);
  };

  // const fetchEmails = useCallback(() => {
  //   dispatch(emails(activeFolder));
  // }, [dispatch, activeFolder]);

  const fetchEmails = useCallback(() => {
    dispatch(emails({ activeFolder, query: searchQuery }));
  }, [dispatch, activeFolder, searchQuery]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  useEffect(() => {
    socket.connect();

    socket.emit("join", userId);

    socket.on("email:new", () => {
      fetchEmails();
      toast.success("📩 New email received");
    });

    return () => {
      socket.off("email:new");
    };
  }, [fetchEmails, userId]);

  const toggleStar = (id) => {
    // Optimistic update
    dispatch(
      toggleImportantLocal(id)
    );

    // dispatch(important(id));

    dispatch(important(id))
      .unwrap()
      .then(() => {
        // Show toast based on new state
        const isImportant = email.find(mail => mail._id === id)?.isImportant;
        if (isImportant) {
          toast.info("Removed from important ⭐");
        } else {
          toast.success("Marked as important ⭐");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update important status");
      });
  };

  const filteredEmails = email;

  const handleEmailDetails = (mail) => {
    setSelectedMail(mail);
    // dispatch(selectedEmail(mail))

  }

  const handleBack = () => {
    setDeleteSelectedMail(null)
    setSelectedMail(null)
    console.log("handleBack in dashboard");

    fetchEmails()
  }

  function formatEmailDate(createdAt) {
    const date = new Date(createdAt);
    const now = new Date();

    const diffMs = now - date;
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 24) {
      // Show only time (hh:mm AM/PM)
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else {
      // Show only date (e.g. Sep 10, 2025)
      return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
    }
  }

  const archiveMail = (id) => {
    dispatch(archive(id)).unwrap()
      .then(() => {
        fetchEmails();
        if (activeFolder === "Archive") {
          toast.success("Email unarchived sucessfully")
        }
        else {
          toast.success("Email archived sucessfully")
        }
      })
      .catch((err) => {
        console.error("Delete failed:", err);
      });
  }


  const markUnread = (id) => {
    // Optimistic toggle in local state
    dispatch(toggleRead(id));

    dispatch(updateRead(id))  // make sure to pass id or payload
      .unwrap()
      .then(() => {
        const updatedMail = email.find(mail => mail._id === id);
        if (updatedMail?.isRead) {
          toast.info("Email marked as unread 📖");
        } else {
          toast.success("Email marked as read ✉️");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update read status");
      });
  };



  const deleteEmail = (id) => {
    console.log("clicked delete");

    if (activeFolder === "Trash") {
      dispatch(deleteParmanentaly(id))
        .unwrap()
        .then(() => {

          fetchEmails();

          toast.success("Email deleted sucessfully")
        })
        .catch((err) => {
          console.error("Delete failed:", err);
        });
    }
    else {
      dispatch(deleteMail(id))
        .unwrap()
        .then(() => {

          fetchEmails();

          toast.success("Email deleted sucessfully")
        })
        .catch((err) => {
          console.error("Delete failed:", err);
        });
    }
  };

  const deleteEmailPopup = (id) => {
    setDeleteSelectedMail(id)
  };


  return (
    <div className="flex w-screen">

      {/* <Sidebar active={activeFolder} onSelect={setActiveFolder} /> */}
      {/* <div className="h-screen">
        <Sidebar active={activeFolder} onSelect={setActiveFolder} data={composeData} open={composeOpen} close={() => setComposeOpen(false)} />
      </div> */}
      <div className="flex flex-col flex-1 overflow-y-auto h-screen">



        {/* Sidebar wrapper */}
        <div className="flex h-screen">
          {/* Sidebar */}
          <div
            className={`
                fixed md:static top-0 left-0 z-40 h-screen
                bg-white
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
              `}
          >
            <Sidebar
              active={activeFolder}
              onSelect={(folder) => {
                setActiveFolder(folder);
                setSidebarOpen(false);
              }}
              data={composeData}
              open={composeOpen}
              close={() => setComposeOpen(false)}
            />
          </div>

          <button
            className={`
              md:hidden
              fixed
              top-1/2
              -translate-y-1/2
              z-50
              bg-white border rounded-full p-2 shadow
              transition-all duration-300
              ${sidebarOpen ? "left-64" : "left-3"}
            `}
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            {sidebarOpen ? "←" : "→"}
          </button>





          <div className="flex-1 p-6 pt-2 ml-0 md:ml-0">

            <div className="p-4 border-b bg-white border-gray-100">
              <Search active={activeFolder} onSearch={(q) => setSearchQuery(q)} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">{activeFolder}</h1>

            {/* Emails list */}

            {loading && (
              <div className="p-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="mb-3">
                    <Skeleton active title paragraph={{ rows: 1 }} />
                  </div>
                ))}
              </div>
            )}
            {!loading && !selectedMail && (
              <List
                itemLayout="horizontal"
                dataSource={filteredEmails}
                renderItem={(mail) => (
                  <List.Item
                    className={`group cursor-pointer px-1 rounded-lg transition-all duration-200
                    ${mail.isRead
                        ? "bg-white hover:bg-green-100 hover:shadow-lg hover:-translate-y-1"
                        : "bg-green-100 hover:shadow-2xl hover:-translate-y-1"
                      }`}
                    onClick={() => handleEmailDetails(mail)}
                  >
                    <div className="flex flex-col w-full px-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 mr-2">
                          <Star
                            // size={18}
                            className={`mr-2  cursor-pointer ${mail.isImportant ? "text-green-500" : "text-gray-400"}`}
                            stroke={mail.isImportant ? "green" : "gray"}
                            fill={mail.isImportant ? "green" : "none"}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStar(mail._id);
                            }}
                          />

                        </div>

                        <span className="mr-2 w-40 sm:w-40 md:w-52 flex-shrink-0 font-semibold truncate">
                          {mail?.senderId?.email || mail.from}
                        </span>

                        <div className="flex items-center w-0 md:w-3/6 space-x-1">
                          {/* <span className="font-semibold text-gray-700 whitespace-nowrap truncate">
                          {mail.subject}
                          </span> */}

                          <span className="font-semibold text-gray-700 whitespace-nowrap truncate
                                hidden md:inline lg:inline">
                            {mail.subject}
                          </span>

                          {/* <span className="text-gray-700 flex-1 truncate">
                          - {mail.content}
                          </span> */}

                          <span className="text-gray-700 flex-1 w-40 sm:w-40 md:w-52 truncate hidden lg:inline">
                            - {mail.content}
                          </span>

                        </div>

                        <span className="text-gray-600 font-semibold text-sm w-36 ml-auto mr-5 text-right group-hover:hidden">
                          {formatEmailDate(mail.createdAt)}
                        </span>

                        <div
                          className="hidden group-hover:flex items-center space-x-1 sm:space-x-2 md:space-x-3 ml-auto text-gray-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Tooltip title="Archive">
                            <Archive
                              size={18}
                              className="cursor-pointer hover:text-green-600 hover:shadow-lg hover:-translate-y-0.5 
                                  transition-all duration-200"
                              onClick={(e) => { e.stopPropagation(); archiveMail(mail._id); }}
                            />
                          </Tooltip>

                          {mail.isRead ? (
                            <Tooltip title="Mark as Unread">
                              <MailOpen
                                size={18}
                                className="cursor-pointer hover:text-green-600 hover:shadow-lg hover:-translate-y-0.5 
                                    transition-all duration-200"
                                onClick={(e) => { e.stopPropagation(); markUnread(mail._id); }}
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Mark as read">
                              <Mail
                                size={18}
                                className="cursor-pointer hover:text-green-600 hover:shadow-lg hover:-translate-y-0.5 
                                    transition-all duration-200"
                                onClick={(e) => { e.stopPropagation(); markUnread(mail._id); }}
                              />
                            </Tooltip>
                          )}



                          <Tooltip title="Delete">
                            <Trash2
                              size={18}
                              className="cursor-pointer hover:text-red-600 hover:shadow-lg hover:-translate-y-0.5 
                                      transition-all duration-200"
                              onClick={(e) => { e.stopPropagation(); deleteEmailPopup(mail._id); }}
                            />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />

            )}

            {!loading && selectedMail && (

              <div className="mt-6 p-4 border rounded-lg bg-white shadow">
                <EmailActions
                  email={selectedMail}
                  onBack={() => handleBack()}
                  onReply={() => handleReply(selectedMail)}
                  onForward={() => handleForward(selectedMail)}
                />
              </div>
            )}

          </div>
        </div>

        <div>
          {/* Main content goes here */}
          <div className="p-4 border-t bg-white border-gray-100 text-center text-sm text-gray-500">
            &copy; 2024 Your Company. All rights reserved.
          </div>
        </div>


      </div>

      {
        deleteSelectedMail && activeFolder === "Trash" && (
          <DeleteModal
            open={!!deleteSelectedMail}
            header="Delete Email"
            message="Are you sure you want to delete this email permanently?"
            onCancel={() => setDeleteSelectedMail(null)}
            onConfirm={() => {
              deleteEmail(deleteSelectedMail);
              setDeleteSelectedMail(null);
            }}
          />
        )}

      {deleteSelectedMail && activeFolder !== "Trash" && (
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
      )}
    </div>

  );
}

export default App;
