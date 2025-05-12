import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Button = ({
    type = "button",
    variant = "primary",
    size = "medium",
    isLoading = false,
    disabled = false,
    onClick,
    children,
    className = "",
    ...props
}) => {
    const baseStyles =
        "focus:outline-none rounded font-semibold transition-all duration-300 flex items-center justify-center gap-2";

    const variantStyles = {
        primary: "bg-blue-600 text-white font-light hover:bg-blue-700",
        transparent:
            "border-2 box-content border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
        secondary:
            "bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300",
        danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
    };

    const sizeStyles = {
        small: "px-4 py-2 text-sm",
        medium: "px-6 py-3 text-base",
        large: "px-8 py-4 text-lg",
        full: "w-full py-3",
    };

    const buttonClassNames = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]
        } ${disabled ? "cursor-not-allowed" : ""} ${className}`;

    const handleClick = (event) => {
        if (!isLoading && !disabled) {
            onClick?.(event);
        }
    };

    return (
        <motion.button
            type={type}
            className={buttonClassNames}
            onClick={handleClick}
            disabled={disabled || isLoading}
            {...props}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg
                        className="w-5 h-5 animate-spin text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path d="M4 12a8 8 0 01.588-2.976L4 12l4 4c-2.95-1.044-5.388-3.514-6.788-6.804C1.948 7.167 4 9.76 4 12z" />
                    </svg>
                </span>
            ) : (
                children
            )}
        </motion.button>
    );
};

Button.propTypes = {
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    variant: PropTypes.oneOf(["primary", "secondary", "danger", "transparent"]),
    size: PropTypes.oneOf(["small", "medium", "large", "full"]),
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Button;
