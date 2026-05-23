// pages/Notifications.tsx

import UserLayout from "../../layout/UserLayout";

export default function Notifications() {
  return (
    <UserLayout>

      <div className="bg-white border rounded-2xl p-5">

        <h1 className="text-2xl font-bold mb-6">
          Notifications
        </h1>

        <div className="space-y-4">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 border-b pb-4"
            >

              <img
                src={`https://i.pravatar.cc/100?img=${item + 20}`}
                alt=""
                className="w-11 h-11 rounded-full"
              />

              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">
                    User {item}
                  </span>{" "}
                  liked your post.
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {item}h ago
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </UserLayout>
  );
}