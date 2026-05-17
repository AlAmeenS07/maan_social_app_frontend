import { useState } from "react";

export default function ProfileContent() {

    const [activeTab, setActiveTab] =
        useState("posts");

    return (
        <>

            {/* TABS */}
            <div className="flex gap-8 mt-10 border-b">

                <button
                    onClick={() => setActiveTab("posts")}
                    className={`pb-3 text-sm font-semibold border-b-2 transition
                    ${
                        activeTab === "posts"
                            ? "border-purple-600 text-purple-600"
                            : "border-transparent text-gray-500"
                    }`}
                >
                    POSTS
                </button>

                <button
                    onClick={() => setActiveTab("saved")}
                    className={`pb-3 text-sm font-semibold border-b-2 transition
                    ${
                        activeTab === "saved"
                            ? "border-purple-600 text-purple-600"
                            : "border-transparent text-gray-500"
                    }`}
                >
                    SAVED
                </button>

            </div>

            {/* POSTS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

                {[1, 2, 3, 4, 5, 6].map((post) => (
                    <div
                        key={post}
                        className="bg-white border rounded-2xl overflow-hidden"
                    >

                        <img
                            src={`https://picsum.photos/500/400?random=${post}`}
                            alt=""
                            className="w-full h-[220px] object-cover"
                        />

                        <div className="p-4 flex items-center justify-between text-sm text-gray-500">

                            <div className="flex gap-4">
                                <span>♡ 1.2k</span>
                                <span>💬 84</span>
                            </div>

                            <button>
                                ↗
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </>
    );
}