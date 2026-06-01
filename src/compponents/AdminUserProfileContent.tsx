import { useEffect, useState } from "react";
import { getPublicImageUrl } from "../helpers/media.helper";
import type { UserType } from "../store/slices/user.slice";
import { useImageView } from "../hooks/user/profile/useImageView";
import type { ProfileType } from "../types/user/user.profile";
import PostListing from "./PostListing";
import { useAdminUserPosts } from "../hooks/admin/post/useAdminUserPosts";
import type { PostResponse } from "../types/user/user.post";



export default function AdminUsedrProfileContent({ id, userData, profile }: {id : string, userData: UserType, profile: ProfileType }) {

    const [posts, setPosts] = useState<PostResponse[]>([])
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    
    const { data: response } = useAdminUserPosts(id)

    const { data: avatarUrl } = useImageView(profile?.avatar)

    const data = response?.data

    useEffect(() => {
        if (!data) return;
        const formatPosts = async () => {
            try {

                const formattedPosts = await Promise.all(
                    data.map(async (post: PostResponse) => ({
                        ...post,
                        media: await Promise.all(
                            (post.media || []).map(async (key) => await getPublicImageUrl(key))
                        ),
                    }))
                );

                setPosts(formattedPosts);

            } catch (error) {
                console.error(error);
            }
        };

        formatPosts();
    }, [data]);

    const [activeTab, setActiveTab] = useState("posts");

    return (
        <>

            {/* TABS */}
            <div className="flex gap-8 mt-10 border-b">

                <button
                    onClick={() => setActiveTab("posts")}
                    className={`pb-3 text-sm font-semibold border-b-2 transition
                    ${activeTab === "posts"
                            ? "border-purple-600 text-purple-600"
                            : "border-transparent text-gray-500"
                        }`}
                >
                    POSTS
                </button>

            </div>

            {/* POSTS */}
            <PostListing user={false} rawPosts={data} posts={posts} userData={userData} avatarUrl={avatarUrl} setOpenMenu={setOpenMenu} openMenu={openMenu} />

        </>
    );
}