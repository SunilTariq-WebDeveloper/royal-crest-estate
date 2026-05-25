import React, { useEffect, useState } from "react";
import axios from "axios";
import apis from "../../../config/apis.js";
import { Mail, User, Calendar, MessageSquare } from "lucide-react";

const ContactMessages = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      const token = authData?.token;

      const res = await axios.get(`${apis[2]}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setContacts(res.data.contacts);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const viewMessage = (contact) => {
    setSelectedMessage(contact);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Contact Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You have {contacts.length} message{contacts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Messages Grid */}
        {loading ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500">Loading messages...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No messages yet</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => viewMessage(contact)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow p-5 cursor-pointer border border-gray-100 dark:border-gray-700"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  {/* Left side - User info */}
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {contact.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle - Subject & Message preview */}
                  <div className="flex-1 md:ml-4">
                    <p className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                      {contact.subject}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                      {contact.message}
                    </p>
                  </div>

                  {/* Right side - Date */}
                  <div className="flex items-center gap-1 text-sm text-gray-400 dark:text-gray-500 md:ml-4">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(contact.createdAt || contact.date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Message Modal */}
        {showModal && selectedMessage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[75vh] overflow-y-auto mt-36">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Message Details
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>
                </div>

                {/* Sender Info */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedMessage.name?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {selectedMessage.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedMessage.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Received:{" "}
                    {formatDate(
                      selectedMessage.createdAt || selectedMessage.date,
                    )}
                  </p>
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Subject
                  </h4>
                  <p className="text-gray-800 dark:text-white font-medium">
                    {selectedMessage.subject}
                  </p>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Message
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Reply Button */}
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
