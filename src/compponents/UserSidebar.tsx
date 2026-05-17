import { useLocation, useNavigate } from "react-router-dom";

interface Props {
    mobile?: boolean;
    onClose?: () => void;
}

export default function UserSidebar({ mobile = false, onClose}: Props) {

    const navigate = useNavigate();
    const location = useLocation();

    const menus = [
        { text: "Home", path: "/" },
        { text: "Explore", path: "/explore" },
        { text: "Messages", path: "/messages" },
        { text: "Notifications", path: "/notifications" },
        { text: "Profile" , path : "/profile"}
    ];

    return (
        <aside
            className={
                mobile
                    ? "absolute left-0 top-0 h-full w-[250px] bg-white border-r px-5 py-6"
                    : "hidden md:flex flex-col w-[250px] bg-white border-r px-5 py-6"
            }
        >

            {/* LOGO */}
            <div className={`flex items-center ${mobile ? "justify-between" : ""} gap-2 mb-10`}>

                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                        ◇
                    </div>

                    <h1 className="font-bold text-purple-600 text-xl">
                        MaaN
                    </h1>
                </div>

                {mobile && (
                    <button
                        onClick={onClose}
                        className="text-2xl"
                    >
                        ×
                    </button>
                )}

            </div>

            {/* MENU */}
            <div className="space-y-2">

                {menus.map((item, i) => {
                    const isActive =
                        location.pathname === item.path;

                    return (
                        <button
                            onClick={() => {
                                navigate(item.path);

                                if (onClose) {
                                    onClose();
                                }
                            }}
                            key={i}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200
                                ${isActive
                                    ? "bg-purple-100 text-purple-700 font-semibold scale-[1.02]"
                                    : "hover:bg-gray-100 text-gray-600 hover:scale-[1.01]"
                                }`}
                        >
                            {item.text}
                        </button>
                    );
                })}

            </div>

            {/* CREATE BUTTON */}
            <button className="mt-10 bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-xl font-medium w-full">
                + Create Post
            </button>

        </aside>
    );
}