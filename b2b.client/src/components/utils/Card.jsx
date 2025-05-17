import React from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

const Card = ({ image, category, title, userProfile, userName }) => {
    return (
        <Link to="/freelancers/test">
            <div className="w-[300px] h-[410px] border border-gray-300 rounded-3xl overflow-hidden relative hover:shadow-xl transition-shadow duration-300">
                {/* Heart Icon */}
                <div className="absolute top-3 right-3">
                    <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center shadow-lg cursor-pointer hover:bg-gray-200 transition-all duration-300">
                        <FiHeart className="text-gray-400 w-6 h-6 hover:text-red-500 transition-all duration-300" />
                    </div>
                </div>

                {/* Product Image */}
                <div
                    className="h-[250px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                ></div>

                {/* Details Section */}
                <div className="px-5 py-3 relative">
                    <span className="text-sm font-semibold text-left text-gray-400 block">
                        {category}
                    </span>

                    <h2 className="text-lg font-bold mt-2">{title}</h2>

                    <img src="/images/Separator.png" className="w-full h-[2px] mt-2" alt="Separator" />

                    {/* User Profile */}
                    <div className="flex items-center mt-2">
                        <img
                            src={userProfile}
                            alt="User Profile"
                            className="w-6 h-6 rounded-full border-2 border-gray-400 object-cover"
                        />
                        <div className="ml-3">
                            <p className="text-sm font-semibold">{userName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
