/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                'fade-in': {
                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.5s ease-in-out forwards',
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                nasalization: ["Nasalization", "sans-serif"],
            },
            colors: {
                primary: "#6E00FF",
                grey: "#6B7177",
                dark: "#2F0058",
            },
            fontSize: {
                h1: {
                    base: "2rem",
                    sm: "2.5rem",
                    md: "3rem",
                    lg: "3.5rem",
                    xl: "4rem",
                },
                h2: {
                    base: "1.75rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "2.75rem",
                    xl: "3rem",
                },
                h3: {
                    base: "1.5rem",
                    sm: "1.75rem",
                    md: "2rem",
                    lg: "2.25rem",
                    xl: "2.5rem",
                },
                h4: {
                    base: "1.25rem",
                    sm: "1.5rem",
                    md: "1.75rem",
                    lg: "2rem",
                    xl: "2.25rem",
                },
                h5: {
                    base: "1rem",
                    sm: "1.25rem",
                    md: "1.5rem",
                    lg: "1.75rem",
                    xl: "2rem",
                },
                h6: {
                    base: "0.875rem",
                    sm: "1rem",
                    md: "1.25rem",
                    lg: "1.5rem",
                    xl: "1.75rem",
                },
            },
        },
    },
    plugins: [
        function ({ addUtilities, theme }) {
            const generateHeadingUtilities = (heading) => {
                return {
                    fontSize: theme(`fontSize.${heading}.base`),
                    [`@screen sm`]: {
                        fontSize: theme(`fontSize.${heading}.sm`),
                    },
                    [`@screen md`]: {
                        fontSize: theme(`fontSize.${heading}.md`),
                    },
                    [`@screen lg`]: {
                        fontSize: theme(`fontSize.${heading}.lg`),
                    },
                    [`@screen xl`]: {
                        fontSize: theme(`fontSize.${heading}.xl`),
                    },
                };
            };

            const newUtilities = {
                ".h1": generateHeadingUtilities("h1"),
                ".h2": generateHeadingUtilities("h2"),
                ".h3": generateHeadingUtilities("h3"),
                ".h4": generateHeadingUtilities("h4"),
                ".h5": generateHeadingUtilities("h5"),
                ".h6": generateHeadingUtilities("h6"),
                // Add custom scrollbar utilities
                '.scrollbar-hidden': {
                    'scrollbar-width': 'none', /* Firefox */
                    '-ms-overflow-style': 'none', /* Internet Explorer and Edge */
                },
                '.scrollbar-hidden::-webkit-scrollbar': {
                    display: 'none', /* Webkit browsers */
                },
            };

            addUtilities(newUtilities, ["responsive"]);
        },
    ],
};
