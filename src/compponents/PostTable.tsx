import { useNavigate } from "react-router-dom";
import type { PostResponse } from "../types/user/user.post";

type Props = {
    posts: PostResponse[];
    changeStatus: (id: string, status: boolean) => void;
};

export default function PostTable({ posts, changeStatus }: Props) {

    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <table className="w-full text-sm">

                <thead className="bg-gray-100 text-gray-600 text-xs uppercase">

                    <tr>
                        <th className="p-3 text-left">
                            S.No
                        </th>

                        <th className="p-3 text-left">
                            User ID
                        </th>

                        <th className="p-3 text-left">
                            Content
                        </th>

                        <th className="p-3 text-left">
                            Created Date
                        </th>

                        <th className="p-3 text-left">
                            Status
                        </th>

                        <th className="p-3 text-left">
                            Actions
                        </th>
                    </tr>

                </thead>

                <tbody>

                    {Array.isArray(posts) &&
                        posts.map(
                            (
                                post,
                                index
                            ) => (

                                <tr
                                    key={post.id}
                                    className="
                                        border-t
                                        hover:bg-gray-50
                                    "
                                >

                                    <td className="p-3">
                                        {index + 1}
                                    </td>

                                    <td className="p-3 font-mono text-xs text-blue-600 cursor-pointer hover:underline"
                                        onClick={() => navigate(`/admin/users/${post?.userId}`)}>
                                        {post.userId}
                                    </td>

                                    <td
                                        className="p-3 max-w-xs text-gray-700"
                                    >
                                        {post.content?.length > 50
                                            ? `${post.content.slice(0, 50)}...`
                                            : post.content}
                                    </td>

                                    <td className="p-3">
                                        {
                                            new Date(
                                                post.createdAt
                                            ).toLocaleDateString()
                                        }
                                    </td>

                                    <td className="p-3">

                                        <span
                                            onClick={() =>
                                                changeStatus(post.id, post.isListed)
                                            }
                                            className={`
                                                px-2
                                                py-1
                                                text-xs
                                                cursor-pointer
                                                rounded
                                                ${post.isListed
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-500"
                                                }
                                            `}
                                        >
                                            {
                                                post.isListed
                                                    ? "Listed"
                                                    : "Unlisted"
                                            }
                                        </span>

                                    </td>

                                    <td className="p-3">

                                        <button
                                            className="
                                                text-sm
                                                border
                                                px-2
                                                py-1
                                                rounded
                                            "
                                            onClick={() =>
                                                navigate(
                                                    `/admin/posts/${post.id}`
                                                )
                                            }
                                        >
                                            View Details
                                        </button>

                                    </td>

                                </tr>

                            )
                        )}

                </tbody>

            </table>

        </div>
    );
}