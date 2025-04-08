import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { motion, AnimatePresence } from "framer-motion";

const Chat = () => {
const { targetUserId } = useParams();
const [messages, setMessages] = useState([]);
  const user = useSelector((store) => store.user);
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const [newMessage, setNewMessage] = useState("");
  const photo = user?.photoUrl;
  const userId = user?._id;
  const messagesContainerRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        photoUrl: msg?.senderId?.photoUrl,
        text: msg.text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);
  useEffect(() => {
    // Scroll to the bottom of the messages container
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text, lastName, photo }) => {
      console.log(firstName + " " + text);

      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, photoUrl: photo },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text: newMessage,
      photo: photo,
    });
    setNewMessage("");
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  return (
    <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="w-full flex justify-center mt-6 sm:mt-10 px-2"
>
  <div className="w-full max-w-2xl border border-gray-700 h-[70vh] flex flex-col rounded-lg overflow-hidden shadow-lg">
    {/* Header */}
    <h1 className="p-3 sm:p-5 border-b border-gray-600 bg-gray-800 text-white text-lg sm:text-2xl text-center">
      Chat
    </h1>

    {/* Messages */}
    <div
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4 bg-gray-700"
    >
      <AnimatePresence initial={false}>
        {messages.map((msg, index) => {
          const isCurrentUser = user.firstName === msg.firstName;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className={isCurrentUser ? "chat chat-end" : "chat chat-start"}
            >
              <div className="chat-image avatar">
                <div className="w-8 sm:w-10 rounded-full">
                  <img alt="img" src={msg.photoUrl || photo} />
                </div>
              </div>

              <div className="chat-header text-xs sm:text-sm">
                {msg.firstName + " " + msg.lastName}
                <time className="text-[10px] sm:text-xs opacity-50 ml-2">12:45</time>
              </div>

              <div className="chat-bubble mt-1 sm:mt-2 text-xs sm:text-sm">
                {msg.text}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>

    {/* Input Section */}
    <div className="p-3 sm:p-5 border-t border-gray-600 bg-gray-800 flex items-center gap-2 sm:gap-4">
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 border border-gray-300 rounded-lg p-2 sm:p-3 bg-gray-300 text-black focus:outline-none text-sm sm:text-base"
        placeholder="Type a message..."
      />
      <button
        onClick={sendMessage}
        className="btn btn-secondary bg-blue-600 text-white text-sm sm:text-base py-2 px-3 sm:px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Send
      </button>
    </div>
  </div>
</motion.div>
  

  
  );
};

export default Chat;
