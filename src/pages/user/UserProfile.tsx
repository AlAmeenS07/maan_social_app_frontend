import { useEffect, useState } from "react";
import UserLayout from "../../layout/UserLayout";
import { useProfileData } from "../../hooks/user/profile/userProfileData";
import SocialLinksModal from "../../compponents/SocialLinksModal";
import ProfileContent from "../../compponents/ProfileContent";
import ProfileHeader from "../../compponents/ProfileHeader";

export default function UserProfile() {

    const [openLinks, setOpenLinks] = useState(false);

    let { data, isLoading } = useProfileData();

    data = data?.data

    useEffect(() => {

    }, [])


    if (isLoading) {
        return (
            <UserLayout>
                <div>Loading...</div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>

            {/* PROFILE CARD */}
            <div className="bg-white border rounded-2xl p-5 md:p-7">

                {/* TOP */}
                <ProfileHeader
                    user={data?.user}
                    profile={data?.profile}
                    onOpenLinks={() => setOpenLinks(true)}
                    editable
                />

                {/* TABS */} {/* POSTS */}
                <ProfileContent />

            </div>

            {/* SOCIAL LINKS MODAL */}
            <SocialLinksModal open={openLinks} onClose={() => setOpenLinks(false)} links={data?.profileLinks || []} />

        </UserLayout>
    );
}