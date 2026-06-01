import type React from "react";
import type { UserType } from "../store/slices/user.slice";
import { useRef, useState, type SetStateAction } from "react";
import type { EditDataType } from "./PostModal";
import ImageSlider from "./ImageSlider";
import PostModal from "./PostModal";
import { useDeletePost } from "../hooks/user/post/useDeletePost";
import { useClickOutside } from "../hooks/common/useClickOutside";
import type { PostResponse } from "../types/user/user.post";


type props = {
    user: boolean
    rawPosts: PostResponse[];
    posts: PostResponse[];
    userData: UserType;
    avatarUrl: string;
    setOpenMenu: React.Dispatch<SetStateAction<string | null>>;
    openMenu: string | null
}


const PostListing = ({ user, rawPosts, posts, userData, avatarUrl, setOpenMenu, openMenu }: props) => {

    const [editPost, setEditPost] = useState(false)
    const [editPostData, setEditPostData] = useState<EditDataType | null>(null)

    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(menuRef, () => setOpenMenu(null))

    const { mutate: deletePostMutate } = useDeletePost()

    const deletePost = (id: string) => {
        deletePostMutate(id)
    }

    return (
        <div className="mt-6 space-y-6">

            {posts?.map((post: PostResponse, i: number) => (

                <div
                    key={post.id}
                    className="bg-white rounded-2xl border overflow-hidden shadow-sm"
                >

                    {/* HEADER */}
                    <div className="flex items-center justify-between px-5 py-4">

                        <div className="flex items-center gap-3">

                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt=""
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                                    {userData?.name?.charAt(0)}
                                </div>
                            )}

                            <div>

                                <div className="flex items-center gap-2">

                                    <h3 className="font-semibold text-gray-900">
                                        {userData?.name}
                                    </h3>

                                </div>

                                <p className="text-sm text-gray-500">
                                    @{userData?.user_name} · {" "}
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </p>

                            </div>

                        </div>

                        {/* MENU */}

                        {user &&
                            <div className="relative">

                                <button
                                    onClick={() =>
                                        setOpenMenu(
                                            openMenu === post.id
                                                ? null
                                                : post.id
                                        )
                                    }
                                    className="text-xl text-gray-500 hover:text-black"
                                >
                                    ⋯
                                </button>

                                {openMenu === post.id && (
                                    <div className="absolute right-0 top-8 bg-white border rounded-xl shadow-lg w-36 z-50" ref={menuRef}>

                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={() => {
                                                setEditPost(true)
                                                setEditPostData({ id: post?.id, content: post.content, media: rawPosts[i].media, mediaPreview: post.media })
                                                setOpenMenu("")
                                            }}
                                        >
                                            Edit Post
                                        </button>

                                        <button
                                            className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                                            onClick={() => {
                                                deletePost(post?.id)
                                                setOpenMenu("")
                                            }}
                                        >
                                            Delete
                                        </button>

                                    </div>
                                )}

                            </div>
                        }

                    </div>

                    {/* CONTENT */}
                    <div className="px-5 pb-4">

                        <p className="text-gray-800 whitespace-pre-wrap leading-7">
                            {post.content}
                        </p>

                        {post.hashtags?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">

                                {post.hashtags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-blue-500 text-sm hover:underline cursor-pointer"
                                    >
                                        #{tag}
                                    </span>
                                ))}

                            </div>
                        )}

                    </div>

                    {/* IMAGE */}
                    {post.media?.length > 0 && (

                        <div className="border-t border-b">

                            <ImageSlider
                                images={post.media}
                                className="max-h-[650px]"
                            />

                        </div>

                    )}


                    {/* ACTIONS */}
                    <div className="border-t px-3 py-2">

                        <div className="grid grid-cols-4 gap-1 text-gray-600">

                            <button className="flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-100 transition">
                                ❤️
                                <span className="text-sm font-medium">
                                    24
                                </span>
                            </button>

                            <button className="flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-100 transition">
                                💬
                                <span className="text-sm font-medium">
                                    8
                                </span>
                            </button>

                            <button className="flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-100 transition">
                                ↗
                                <span className="text-sm font-medium">
                                    5
                                </span>
                            </button>

                            <button className="flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-100 transition">
                                🔖
                            </button>

                        </div>

                    </div>

                </div>
            ))}

            {editPost &&
                <PostModal editData={editPostData} open={true} onClose={() => setEditPost(false)} />
            }

        </div>
    )
}

export default PostListing