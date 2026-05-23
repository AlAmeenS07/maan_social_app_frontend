// pages/Explore.tsx

import UserLayout from "../../layout/UserLayout";

export default function Explore() {
  return (
    <UserLayout>

      <div className="space-y-6">

        <div className="bg-white border rounded-2xl p-5">
          <h1 className="text-2xl font-bold">
            Explore
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Discover trending creators and content.
          </p>
        </div>

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white border rounded-2xl p-5"
          >
            <img
              src={`https://picsum.photos/800/300?random=${item}`}
              alt=""
              className="w-full h-[220px] object-cover rounded-xl"
            />

            <h2 className="font-semibold text-lg mt-4">
              Trending Topic #{item}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Explore what's happening around the community today.
            </p>
          </div>
        ))}

      </div>

    </UserLayout>
  );
}