import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as IoBookcons from "react-icons/io5";

export const SideBarData = [
    {
        title: "DashBoard",
        path: "/dashboard",
        icon: <AiIcons.AiFillDashboard />,
        cName: "auth-nav-text"
    },
    {
        title: "Tasks",
        path: "/tasks",
        icon: <FaIcons.FaTasks />,
        cName: "auth-nav-text"
    },
    {
        title: "Wikipedia",
        path: "/wikipedia",
        icon: <FaIcons.FaWikipediaW />,
        cName: "auth-nav-text"
    },
    {
        title: "Google Books",
        path: "/books",
        icon: <IoBookcons.IoBookSharp />,
        cName: "auth-nav-text"
    },
    {
        title: "Youtube",
        path: "/youtube",
        icon: <FaIcons.FaYoutube />,
        cName: "auth-nav-text"
    },
    {
        title: "Game",
        path: "/game",
        icon: <IoIcons.IoLogoGameControllerB />,
        cName: "auth-nav-text"
    },

    {
        title: "Logout",
        path: "/",
        icon: <AiIcons.AiOutlineLogout />,
        cName: "auth-nav-text"
    }
];
