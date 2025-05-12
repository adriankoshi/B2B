// Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiSearch, CiGrid41 } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = ({ session, signOut }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const pathname = location.pathname;

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const toggleDropdown = () => setDropdownOpen((prev) => !prev);
    const handleMouseEnter = () => setDropdownOpen(true);
    const handleMouseLeave = () => setDropdownOpen(false);

    const constants = {
        navItems: [
            {
                text: "Home",
                href: "/",
                icon: <MdKeyboardArrowDown />,
                subItems: [
                    { text: "Home 1", href: "/home" },
                    { text: "Home 2", href: "/home-2" },
                    { text: "Home 3", href: "/home-3" },
                    { text: "Home 4", href: "/home-4" },
                ],
            },
            { text: "Browse Jobs", href: "/browse", icon: <MdKeyboardArrowDown /> },
            { text: "Users", href: "/users", icon: <MdKeyboardArrowDown /> },
            { text: "Pages", href: "/pages", icon: <MdKeyboardArrowDown /> },
            { text: "Contact", href: "/contact" },
        ],
    }

    const renderAuthSection = () => (
        !session ? (
            <>
                <li><Link to="/sign-up">Become a Seller</Link></li>
                <li><Link to="/sign-in">Sign in</Link></li>
                <li><button className="bg-blue-500 text-white px-4 py-2 rounded">Join</button></li>
            </>
        ) : (
            <li
                className="relative inline-block text-left"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                    <img className="h-10 w-10 rounded-full" src={session.user.image} alt="Profile" />
                    <span className="text-gray-700 font-medium">{session?.user?.name}</span>
                    <MdKeyboardArrowDown className="text-gray-500" />
                </div>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-20">
                        <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                        <Link to="/projects" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Jobs</Link>
                        <Link to="/notifications" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Notifications</Link>
                        <div className="border-t border-gray-200"></div>
                        <button
                            onClick={signOut}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </li>
        )
    );

    if (pathname !== "/") {
        return (
            <nav className="text-sm flex items-center border-b px-8 py-4 md:px-20 lg:px-24 xl:px-32 divide-x relative">
                <div className="md:hidden absolute right-4 top-4">
                    <button onClick={toggleMenu} aria-label="Toggle Menu">
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-2xl" />
                    </button>
                </div>

                <Link to="/" className="flex items-center justify-center mr-6">
                    <img src="/brand/logo.svg" alt="Logo" width={125} height={125} />
                </Link>

                <div className={`w-full flex items-center divide-x ${isOpen ? "block" : "hidden"} md:flex`}>
                    <div className="relative w-full flex justify-between px-6">
                        <div>
                            <Link to="/categories" className="flex items-center gap-1">
                                <CiGrid41 className="text-xl" /> Categories
                            </Link>
                        </div>

                        <ul className="flex gap-6">
                            {constants.navItems.map((item) => (
                                <li className="group relative" key={item.href}>
                                    <Link to={item.href} className="flex items-center gap-1">
                                        {item.text}
                                        {item.icon}
                                    </Link>
                                    {item.subItems && (
                                        <ul className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 top-11 w-full bg-white z-[999] border border-t-0 transition-all">
                                            {item.subItems.map((subItem) => (
                                                <li key={subItem.href}>
                                                    <Link to={subItem.href} className="flex items-center gap-1 p-2 hover:bg-gray-100 transition">
                                                        {subItem.text}
                                                        {subItem.icon}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <ul className="pl-6 flex items-center gap-6 whitespace-nowrap">
                        {renderAuthSection()}
                    </ul>
                </div>

                {isOpen && (
                    <div className="fixed inset-0 bg-purple-900 text-white z-50 flex flex-col justify-center items-center space-y-6 md:hidden">
                        <button
                            className="absolute top-4 right-4 text-4xl focus:outline-none"
                            onClick={toggleMenu}
                            aria-label="Close Menu"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <ul className="space-y-6 text-2xl">
                            {constants.navItems.map((item) => (
                                <li key={item.href}><Link to={item.href}>{item.text}</Link></li>
                            ))}
                            {renderAuthSection()}
                        </ul>
                    </div>
                )}
            </nav>
        );
    }

    return (
        <div className="absolute z-20 w-full">
            <div className="flex items-center justify-around px-8 py-4 text-white">
                <div className="logo">
                    <Link to="/" className="flex items-center justify-center mr-6">
                        <img src="images/temnex_logo.png" alt="Temnex" className="w-32" />
                    </Link>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle Menu">
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-2xl" />
                    </button>
                </div>

                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/categories" className="flex items-center gap-1">
                        <CiGrid41 className="text-xl" /> Categories
                    </Link>
                    <ul className="flex space-x-6">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/freelancers">Browse Jobs</Link></li>
                        <li><Link to="/projects">Users</Link></li>
                        <li>Pages</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className="hidden md:flex space-x-4 items-center">
                    {renderAuthSection()}
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-purple-900 text-white z-50 flex flex-col justify-center items-center space-y-6 md:hidden">
                    <button
                        className="absolute top-4 right-4 text-4xl focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Close Menu"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <ul className="space-y-6 text-2xl">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/freelancers">Browse Jobs</Link></li>
                        <li><Link to="/projects">Users</Link></li>
                        <li>Pages</li>
                        <li>Contact</li>
                    </ul>
                    <div className="flex flex-col space-y-4">
                        <button>Become a Seller</button>
                        <button>Sign in</button>
                        <button className="bg-gray-200 text-black py-2 px-4 rounded-full">Join</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
