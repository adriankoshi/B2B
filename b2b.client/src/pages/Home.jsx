import Footer from "../components/partials/Footer";
import Navbar from "../components/partials/Navbar";
import Button from "../components/utils/Button";
import Card from "../components/utils/Card";
import { GoArrowUpRight } from "react-icons/go";

export default function Home() {

    const categories = [
        "Web Development",
        "Design",
        "Marketing",
        "Writing",
        "Business",
    ];
    const products = [
        {
            image: "images/card.jpg",
            category: "Web & App Design",
            title: "I will design modern websites in figma or adobe xd",
            userProfile: "images/user_pp.png",
            userName: "John Doe",
        },
        {
            image: "images/card.jpg",
            category: "Web & App Design",
            title: "I will design modern websites in figma or adobe xd",
            userProfile: "images/user_pp.png",
            userName: "John Doe",
        },
        {
            image: "images/card.jpg",
            category: "Web & App Design",
            title: "I will design modern websites in figma or adobe xd",
            userProfile: "images/user_pp.png",
            userName: "John Doe",
        },
        {
            image: "images/card.jpg",
            category: "Web & App Design",
            title: "I will design modern websites in figma or adobe xd",
            userProfile: "images/user_pp.png",
            userName: "John Doe",
        },
        {
            image: "images/card.jpg",
            category: "Web & App Design",
            title: "I will design modern websites in figma or adobe xd",
            userProfile: "images/user_pp.png",
            userName: "John Doe",
        },
        {
            image: "images/card.jpg",
            category: "Web & App Design",
            title: "I will design modern websites in figma or adobe xd",
            userProfile: "images/user_pp.png",
            userName: "John Doe",
        },
        {
            image: "images/card.jpg",
            category: "Web & App Design",
            title: "I will design modern websites in figma or adobe xd",
            userProfile: "images/user_pp.png",
            userName: "John Doe",
        },
        {
            image: "images/card.jpg",
            category: "Web & App Design",
            title: "I will design modern websites in figma or adobe xd",
            userProfile: "images/user_pp.png",
            userName: "John Doe",
        },
    ];

    return (
        <>
            <Navbar />
            <div className="relative">
                {/* Hero Section */}
                <div className="hero relative h-screen w-full flex flex-col lg:flex-row items-center justify-center text-center bg-[url('/images/hero.png')] bg-cover bg-center bg-no-repeat">

                </div>
            </div>

            <div className="container mx-auto p-16">
                {/* Title Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-8 text-center sm:text-left">
                    {/* Left Side: Titles */}
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-5xl  font-nasalization">Popular services</h1>
                        <p className="text-sm text-gray-500">
                            Most viewed and all-time top-selling services
                        </p>
                    </div>

                    {/* Right Side: Categories */}
                    <ul className="flex sm:flex-wrap space-x-0 sm:space-x-3 overflow-x-auto sm:overflow-visible w-full sm:w-auto justify-start sm:justify-end scrollbar-hide">
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                className={`px-4 py-2 sm:px-4 sm:py-2 ${index === 0 ? "bg-gray-100 text-gray-700" : "text-gray-500"
                                    } 
                rounded-full cursor-pointer transition-all duration-300 hover:bg-[#F4EDFB] hover:text-gray-900 min-w-full sm:min-w-auto sm:min-w-fit`}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Product Cards */}
                <div className="flex flex-wrap justify-center gap-6">
                    {products.map((product, index) => (
                        <Card
                            key={index}
                            image={product.image}
                            category={product.category}
                            title={product.title}
                            userProfile={product.userProfile}
                            userName={product.userName}
                        />
                    ))}
                </div>
                <div className="w-full flex justify-center mt-20">
                    <Button
                        type="submit"
                        size="small"
                        variant="transparent"
                        className="rounded-2xl"
                    >
                        All Services
                        <GoArrowUpRight className="text-2xl" />
                    </Button>
                </div>
            </div>

            <Footer />
        </>
    );
}
