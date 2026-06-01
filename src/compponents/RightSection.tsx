
const RightSection = () => {
    return (
        <aside className="hidden xl:block w-[300px] flex-shrink-0">

            {/* Who to Follow */}
            <div className="bg-white rounded-2xl border p-5">

                <h2 className="font-bold mb-4">
                    Who to follow
                </h2>

                {[1, 2, 3].map((user) => (
                    <div
                        key={user}
                        className="flex items-center justify-between mb-4"
                    >
                        <div className="flex items-center gap-3">

                            <img
                                src={`https://i.pravatar.cc/100?img=${user}`}
                                alt=""
                                className="w-10 h-10 rounded-full"
                            />

                            <div>
                                <p className="font-medium text-sm">
                                    User {user}
                                </p>

                                <p className="text-xs text-gray-500">
                                    @user{user}
                                </p>
                            </div>

                        </div>

                        <button className="bg-black text-white px-3 py-1 rounded-full text-sm">
                            Follow
                        </button>
                    </div>
                ))}
            </div>

            {/* Trending */}
            <div className="bg-white rounded-2xl border p-5 mt-5">

                <h2 className="font-bold mb-4">
                    Trending
                </h2>

                {[
                    "#ReactJS",
                    "#TypeScript",
                    "#TailwindCSS",
                    "#OpenAI",
                    "#WebDevelopment",
                ].map((tag) => (
                    <div
                        key={tag}
                        className="py-3 border-b last:border-0"
                    >
                        <p className="font-medium">
                            {tag}
                        </p>

                        <p className="text-xs text-gray-500">
                            Trending now
                        </p>
                    </div>
                ))}

            </div>

        </aside>
    )
}

export default RightSection