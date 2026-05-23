// pages/Messages.tsx

import UserLayout from "../../layout/UserLayout";

export default function Messages() {
  return (
    <UserLayout>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">

        {/* CHAT LIST */}
        <div className="bg-white border rounded-2xl p-4">

          <h1 className="text-xl font-bold mb-5">
            Messages
          </h1>

          <div className="space-y-4">

            {[1, 2, 3].map((chat) => (
              <div
                key={chat}
                className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl cursor-pointer"
              >

                <img
                  src={`https://i.pravatar.cc/100?img=${chat + 30}`}
                  alt=""
                  className="w-11 h-11 rounded-full"
                />

                <div>
                  <h3 className="font-semibold text-sm">
                    Chat User {chat}
                  </h3>

                  <p className="text-xs text-gray-500">
                    Hey there 👋
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* CHAT BOX */}
        <div className="bg-white border rounded-2xl p-5 flex flex-col justify-between min-h-[500px]">

          <div className="space-y-4">

            <div className="bg-gray-100 w-fit px-4 py-2 rounded-2xl text-sm">
              Hello 👋
            </div>

            <div className="bg-purple-600 text-white w-fit ml-auto px-4 py-2 rounded-2xl text-sm">
              Hi! How are you?
            </div>

          </div>

          <div className="flex gap-3 mt-6">

            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-xl px-4 py-3 outline-none text-sm"
            />

            <button className="bg-purple-600 text-white px-5 rounded-xl">
              Send
            </button>

          </div>
        </div>

      </div>

    </UserLayout>
  );
}