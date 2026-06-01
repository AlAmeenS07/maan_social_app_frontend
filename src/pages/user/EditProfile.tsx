
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import UserLayout from "../../layout/UserLayout";
import { useProfileData } from "../../hooks/user/profile/userProfileData";
import type { EditProfileFormData,} from "../../types/user/user.profile";
import { useNavigate, useParams } from "react-router-dom";
import { useLocationSearch } from "../../hooks/user/profile/useLocationData";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useClickOutside } from "../../hooks/common/useClickOutside";
import { useCheckUserName } from "../../hooks/user/profile/useCheckUserName";
import { uploadImageToS3 } from "../../helpers/media.helper";
import { useUpdateProfile } from "../../hooks/user/profile/useUpdateProfile";
import Button from "../../compponents/Button";
import { useImageView } from "../../hooks/user/profile/useImageView";
import EditProfileFields from "../../compponents/EditProfileForm";

export default function EditProfile() {

    const { data: profileData } = useProfileData();

    const { id } = useParams()

    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const navigate = useNavigate();

    const user = profileData?.data.user;
    const profile = profileData?.data.profile;

    const { data: ProfileAvatar } = useImageView(profile?.avatar)


    const [avatarPreview, setAvatarPreview] = useState("");
    const [showLocations, setShowLocations] = useState(false);

    const locationRef = useRef<HTMLDivElement | null>(null);

    const { register, handleSubmit, reset, watch, setValue, setError, clearErrors, formState: { errors } } = useForm<EditProfileFormData>();

    const watchedLocation = watch("location");
    const watchedName = watch("name");
    const watchedUsername = watch("user_name");

    const debouncedLocation = useDebounce(watchedLocation, 300);
    const debouncedUsername = useDebounce(watchedUsername, 100);

    const { data: locationData } = useLocationSearch(debouncedLocation);
    const { mutate: checkUsername } = useCheckUserName();

    useEffect(() => {
        if (!debouncedUsername) return;
        checkUsername(debouncedUsername, {

            onSuccess: (res) => {
                if (res.data === false) {
                    setError("user_name", {
                        type: "manual",
                        message: "Username already taken !"
                    });

                } else {
                    clearErrors("user_name");
                }
            }
        });

    }, [debouncedUsername]);

    // PREFILL FORM
    useEffect(() => {
        if (user && profile) {
            reset({
                name: user.name || "",
                user_name: user.user_name || "",
                bioHead: profile.bioHead || "",
                bioText: profile.bioText || "",
                location: profile.location || "",
                gender: profile.gender || "",
                dob: profile.dob ? new Date(profile.dob).toISOString().split("T")[0] : "",
                avatar: profile?.avatar || ""
            });

            setAvatarPreview(profile?.avatar ? ProfileAvatar : "");
        }

    }, [user, profile, reset]);

    useClickOutside(locationRef, () => setShowLocations(false));

    const handleSelectLocation = (location: string) => {
        setValue("location", location);
        setShowLocations(false);
    };

    const handleImageUpload = async (file: File) => {
        const key = await uploadImageToS3(file);
        setValue("avatar", key);
    };

    // SUBMIT
    const onSubmit = async (values: EditProfileFormData) => {
        console.log(values);
        updateProfile({ id: id || '', data: values });
    };

    return (
        <UserLayout>

            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Edit Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage how others see you on the platform.
                    </p>

                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" >

                    {/* PROFILE IMAGE */}
                    <div className="bg-white border rounded-2xl p-6">

                        <h2 className="font-semibold text-gray-800 mb-5">
                            Profile Image
                        </h2>

                        <div className="flex flex-col md:flex-row md:items-center gap-6">

                            {/* IMAGE */}
                            <div className="relative w-fit">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt=""
                                        className="w-24 h-24 rounded-full object-cover border-4 border-purple-100"
                                    />
                                ) : (

                                    <div className="w-24 h-24 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl font-bold border-4 border-purple-100">
                                        {watchedName?.charAt(0)}
                                    </div>
                                )}

                            </div>

                            {/* ACTIONS */}
                            <div>

                                <div className="flex gap-3 flex-wrap">

                                    {/* UPLOAD */}
                                    <label className="bg-purple-600 hover:bg-purple-700 transition text-white px-5 py-2 rounded-xl text-sm font-medium cursor-pointer">

                                        Upload Photo

                                        <input type="file" accept="image/*" hidden onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            const preview = URL.createObjectURL(file);
                                            setAvatarPreview(preview);
                                            await handleImageUpload(file);
                                        }}
                                        />

                                    </label>

                                    {/* REMOVE */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAvatarPreview("");
                                            setValue("avatar", undefined);
                                        }}
                                        className="border hover:bg-gray-50 transition text-red-500 px-5 py-2 rounded-xl text-sm font-medium"
                                    >
                                        Remove
                                    </button>

                                </div>
                                
                                <p className="text-sm text-gray-500 mt-4 leading-6">
                                    Add a good profile picture, which helps other users to identify you.
                                </p>

                            </div>

                        </div>

                    </div>

                    {/*  BASIC INFO */}

                    <EditProfileFields
                        register={register}
                        errors={errors}
                        locationRef={locationRef}
                        showLocations={showLocations}
                        setShowLocations={setShowLocations}
                        locationData={locationData}
                        handleSelectLocation={handleSelectLocation}
                    />

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-4 pt-6">

                        <Button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="border border-purple-500 text-purple-600 hover:bg-purple-50 transition px-6 py-3 rounded-xl font-medium"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            isLoading={isPending}
                            loadingText="Saving..."
                            className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-xl font-medium shadow-md"
                        >
                            Save All Changes
                        </Button>

                    </div>

                </form>

            </div>

        </UserLayout>
    );
}
