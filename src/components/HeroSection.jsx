import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black overflow-hidden border-3 border-slate-200 z-10">
            {/* Background circles for soft design */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

            {/* Main Content */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight max-w-3xl">
                Welcome to <span className="text-blue-600">10Mega Blog</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Discover powerful ideas, share your thoughts, and inspire the world — one post at a time.
            </p>

            <div className="mt-10 flex gap-4">
                <Link
                    to="/all-posts"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-lg transition-all"
                >
                    Start Reading <ArrowRight size={18} />
                </Link>
                <Link
                    to="/add-post"
                    className="px-6 py-3 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                    Write a Blog
                </Link>
            </div>

            {/* Small tagline */}
            <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
                ✨ Empowering creators since 2024
            </p>
        </section>
    );
};

export default HeroSection;
