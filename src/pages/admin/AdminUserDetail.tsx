import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import ProfileHeader from "../../compponents/ProfileHeader";
import SocialLinksModal from "../../compponents/SocialLinksModal";
import ProfileContent from "../../compponents/ProfileContent";
import { useParams } from "react-router-dom";
import { useAdminUserDetail } from "../../hooks/admin/users/useAdminUserDetial";
import type { ProfileLinkType } from "../../types/user/user.profile";

export default function AdminUserDetail() {

    const [openLinks, setOpenLinks] = useState(false);

    const { id } = useParams()

    const { data: response } = useAdminUserDetail(id as string)

    const data = response?.data

    console.log("data" , data)

    const [socialLinks, setSocialLinks] = useState<ProfileLinkType[]>([]);
    

    useEffect(() => {
        if (data?.profileLinks) {
            setSocialLinks(data.profileLinks);
        }
    }, [data?.profileLinks]);

    return (
        <AdminLayout>

            <div className="bg-white border rounded-2xl p-5 md:p-7">

                {/* PROFILE HEADER */}
                <ProfileHeader
                    user={data?.user}
                    profile={data?.profile}
                    profileLinks={socialLinks}
                    onOpenLinks={() => setOpenLinks(true)}
                    editable={false}
                />

                {/* ADMIN EXTRA DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-gray-500">Email</p>
                        <h3 className="font-semibold text-gray-800">
                            {data?.user?.email  || "N/A"}
                        </h3>
                    </div>

                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-gray-500">Gender</p>
                        <h3 className="font-semibold text-gray-800 capitalize">
                            {data?.profile?.gender || "N/A"}
                        </h3>
                    </div>

                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-gray-500">Location</p>
                        <h3 className="font-semibold text-gray-800">
                            {data?.profile?.location || "N/A"}
                        </h3>
                    </div>

                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <h3 className="font-semibold text-gray-800">
                            {new Date(data?.profile?.dob).toLocaleDateString() || "N/A"}
                        </h3>
                    </div>

                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-gray-500">Verified</p>

                        <span
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium
                            ${
                                data?.user?.is_verified
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {data?.user?.is_verified ? "Verified" : "Not Verified"}
                        </span>
                    </div>

                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-gray-500">Account Status</p>

                        <span
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium
                            ${
                                data?.user?.is_blocked
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                        >
                            {data?.user?.is_blocked ? "Blocked" : "Active"}
                        </span>
                    </div>

                </div>

                {/* POSTS */}
                <ProfileContent user={false}/>

            </div>

            {/* SOCIAL LINKS */}
            <SocialLinksModal
                open={openLinks}
                onClose={() => setOpenLinks(false)}
                links={socialLinks}
            />

        </AdminLayout>
    );
}