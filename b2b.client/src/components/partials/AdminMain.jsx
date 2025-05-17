import React, { useState, useEffect } from "react";
import { IoMdSettings } from "react-icons/io";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";

// Mock constants
const constants = {
    sidebarItems: [
        { href: "/dashboard", label: "Dashboard", icon: <IoMdSettings /> },
        { href: "/notifications", label: "Notifications", icon: <FaBell /> },
        { href: "/dashboard/products", label: "Products", icon: <FaBell /> },
    ],
};

// Mock user
const mockUser = {
    name: "John Doe",
    email: "johndoe@example.com",
    image: "/images/user_pp.png",
};

const AdminMain = ({ children }) => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [roleId, setRoleId] = useState(null);

    useEffect(() => {
        console.log("Socket initialized");
    }, []);

    return (
        <main className="h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity md:hidden ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            <aside
                className={`fixed z-50 top-0 left-0 h-full w-64 bg-white p-4 transform transition-transform duration-300 md:relative md:translate-x-0 md:w-72 md:rounded-xl ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center mb-4 md:hidden">
                    <span className="text-lg font-bold">Menu</span>
                    <button onClick={() => setIsSidebarOpen(false)}>
                        <FaTimes size={20} />
                    </button>
                </div>

                <ul className="space-y-3">
                    <li className="pb-3 flex items-center gap-3 border-b">
                        <img
                            src={mockUser.image}
                            width={50}
                            height={50}
                            alt="profile"
                            className="rounded-full"
                        />
                        <div className="md:block hidden">
                            <p>{mockUser.name}</p>
                            <span className="text-sm text-gray-500">{mockUser.email}</span>
                        </div>
                    </li>
                    {constants.sidebarItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 p-3 ${location.pathname === item.href ? "bg-gray-100" : "hover:bg-gray-100"
                                    } transition rounded-lg`}
                            >
                                <div
                                    className={`w-fit p-1 rounded ${location.pathname === item.href ? "bg-dark text-white" : "bg-gray-100"
                                        } text-lg`}
                                >
                                    {item.icon}
                                </div>
                                <span
                                    className={`md:block hidden ${location.pathname === item.href ? "text-dark font-medium" : "text-gray-500"
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <section className="flex flex-col w-full md:space-y-6 space-y-4 md:ml-0 ml-0">
                {/* Top Nav */}
                <nav className="flex justify-between items-center bg-white md:p-6 p-4 w-full rounded-xl h-fit">
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Toggle */}
                        <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
                            <FaBars size={20} />
                        </button>
                        <img src="/brand/logo.svg" width={100} height={100} alt="logo" />
                    </div>
                    <div className="flex gap-3">
                        <IoMdSettings />
                        <FaBell />
                    </div>
                </nav>

                {/* Page Content */}
                <div className="h-full md:space-y-6 space-y-4 scrollbar-hidden overflow-auto p-4">
                    {children}
                </div>
            </section>
        </main>
    );
};

export default AdminMain;
