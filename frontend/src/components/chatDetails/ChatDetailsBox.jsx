import React, { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

import Overview from "./Overview";
import Member from "./Member";
import ChatSetting from "./ChatSetting";

import { useSelector } from "react-redux";

const ChatDetailsBox = () => {
  const selectedChat = useSelector(
    (store) => store?.myChat?.selectedChat
  );

  const [detailView, setDetailView] = useState("overview");

  return (
    <div className="flex w-full">
      
      {/* LEFT MENU */}
      <div className="w-fit h-[60vh] p-2 flex flex-col gap-2 bg-slate-900">

        {/* OVERVIEW */}
        <div
          className={`flex gap-2 items-center p-2 text-white rounded-md cursor-pointer ${
            detailView === "overview"
              ? "bg-blue-950"
              : "bg-slate-800"
          }`}
          onClick={() => setDetailView("overview")}
        >
          <CiCircleInfo size={18} />
          <span className="hidden sm:block">Overview</span>
        </div>

        {/* MEMBERS (ONLY FOR GROUP) */}
        {selectedChat?.isGroupChat && (
          <div
            className={`flex gap-2 items-center p-2 text-white rounded-md cursor-pointer ${
              detailView === "members"
                ? "bg-blue-950"
                : "bg-slate-800"
            }`}
            onClick={() => setDetailView("members")}
          >
            <HiOutlineUsers size={18} />
            <span className="hidden sm:block">Members</span>
          </div>
        )}

        {/* SETTINGS */}
        <div
          className={`flex gap-2 items-center p-2 text-white rounded-md cursor-pointer ${
            detailView === "setting"
              ? "bg-blue-950"
              : "bg-slate-800"
          }`}
          onClick={() => setDetailView("setting")}
        >
          <IoSettingsOutline size={18} />
          <span className="hidden sm:block">Setting</span>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 h-[60vh] bg-slate-800 p-3 rounded-md ml-2">
        
        {detailView === "overview" && <Overview />}

        {detailView === "members" && selectedChat?.isGroupChat && (
          <Member />
        )}

        {detailView === "setting" && <ChatSetting />}

      </div>
    </div>
  );
};

export default ChatDetailsBox;