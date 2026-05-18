import { useNavigate } from "react-router-dom";
import type { UserType } from "../store/slices/user.slice";
import type { ProfileLinkType, ProfileType } from "../types/user/user.profile";
import { useImageView } from "../hooks/user/profile/useImageView";
import React, { useState } from "react";
import SocialLinksModification from "./SocialLinksModification";

interface Props {
    user: UserType
    profile: ProfileType
    profileLinks : ProfileLinkType[]
    onOpenLinks: () => void;
    setSocialLinks : React.Dispatch<React.SetStateAction<ProfileLinkType[]>>
    editable?: boolean;
}

export default function ProfileHeader({ user, profile, profileLinks, onOpenLinks, setSocialLinks, editable = false }: Props) {

    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"add" | "edit">("add");

    const { data: ProfileAvatar } = useImageView(profile?.avatar)

    return (
        <div className="bg-white border rounded-2xl p-5 md:p-7">

            {/* TOP */}
            <div className="flex flex-col md:flex-row md:items-start gap-6">

                {/* IMAGE */}
                <div className="relative w-fit">

                    {profile?.avatar ? (
                        <img
                            src={ProfileAvatar}
                            alt=""
                            className="w-28 h-28 rounded-full object-cover border-4 border-purple-500"
                        />
                    ) : (
                        <div className="w-28 h-28 rounded-full border-4 border-purple-500 bg-purple-100 flex items-center justify-center text-4xl font-bold text-purple-700 uppercase">

                            {user?.name?.charAt(0)}

                        </div>
                    )}


                    <p className="text-sm mt-4 text-center text-gray-500">
                        @{user?.user_name}
                    </p>

                </div>

                {/* INFO */}
                <div className="flex-1">

                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 mt-1">
                                {user?.name}
                            </h1>

                        </div>

                        {editable && (
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
                                onClick={() => navigate(`/profile/${user?.id}`)}>
                                Edit Profile
                            </button>
                        )}

                    </div>

                    {/* STATS */}
                    <div className="flex gap-8 mt-6">

                        <div>
                            <h3 className="font-bold text-gray-800">
                                0
                            </h3>

                            <p className="text-sm text-gray-500">
                                Posts
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800">
                                24
                            </h3>

                            <p className="text-sm text-gray-500">
                                Followers
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800">
                                49
                            </h3>

                            <p className="text-sm text-gray-500">
                                Following
                            </p>
                        </div>

                    </div>

                    {/* BIO */}
                    <div className="mt-6">

                        <h3 className="font-semibold text-gray-800 uppercase">
                            {profile?.bioHead || "No Bio Heading"}
                        </h3>

                        <p className="text-sm text-gray-600 leading-6 mt-2">
                            {profile?.bioText || "No bio added yet."}
                        </p>

                    </div>

                    {/* SOCIAL LINKS */}
                    <div className="flex items-center gap-3 mt-5 flex-wrap">

                        <button onClick={onOpenLinks} className="text-blue-600 font-semibold underline">
                            Social Links
                        </button>

                        {editable && (
                            <>
                                {/* ADD */}
                                <button className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition flex items-center justify-center text-lg font-bold"
                                    onClick={()=> {
                                        setOpen(true)
                                        setMode("add")
                                    }}>
                                    +
                                </button>

                                {/* EDIT */}
                                <button className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition flex items-center justify-center"
                                    onClick={()=> {
                                        setOpen(true)
                                        setMode("edit")
                                    }}>
                                    ✎
                                </button>
                            </>
                        )}

                    </div>

                </div>

            </div>

            {open && 
                <SocialLinksModification
                    open={open}
                    mode={mode}
                    initialData={profileLinks}
                    setOpen={setOpen}
                    setSocialLinks={setSocialLinks}
                />
            }

        </div>
    );
}