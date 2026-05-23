import UserLayout from "../../layout/UserLayout";


export default function Home() {
  return (
    <UserLayout>

      {/* CREATE POST */}
      <div className="bg-white rounded-2xl border p-4 md:p-5">

        <div className="flex gap-4">
          <img
            src="https://i.pravatar.cc/100"
            alt=""
            className="w-11 h-11 rounded-full"
          />

          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 bg-gray-100 rounded-xl px-4 outline-none text-sm"
          />
        </div>

        <div className="flex justify-between items-center mt-5">

          <div className="flex gap-5 text-sm text-gray-500">
            <button>📷 Photo</button>
            <button>😊 Feeling</button>
          </div>

          <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm">
            Post
          </button>
        </div>
      </div>

      {/* POSTS */}
      <div className="space-y-6 mt-6">

        {[1, 2].map((post) => (
          <div
            key={post}
            className="bg-white rounded-2xl border p-4 md:p-5"
          >

            {/* HEADER */}
            <div className="flex justify-between">

              <div className="flex gap-3">
                <img
                  src={`https://i.pravatar.cc/150?img=${post + 10}`}
                  alt=""
                  className="w-11 h-11 rounded-full"
                />

                <div>
                  <h3 className="font-semibold text-sm">
                    {post === 1
                      ? "Sarah Jenkins"
                      : "Marcus Johnson"}
                  </h3>

                  <p className="text-xs text-gray-500">
                    2h ago
                  </p>
                </div>
              </div>

              <button className="text-gray-400">
                •••
              </button>
            </div>

            {/* CONTENT */}
            <p className="text-sm text-gray-600 mt-4 leading-6">
              {post === 1
                ? "Just finished setting up my new workspace! The natural light here is amazing."
                : "Exploring the latest updates in the MaaN creator dashboard."}
            </p>

            {/* IMAGE */}
            {post === 1 && (
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
                alt=""
                className="rounded-2xl mt-4 w-full h-[220px] md:h-[350px] object-cover"
              />
            )}

            {/* ACTIONS */}
            <div className="flex gap-6 mt-5 text-sm text-gray-500">
              <button>♡ 124</button>
              <button>💬 18</button>
              <button>↗ Share</button>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
}