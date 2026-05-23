import type { UserType } from "../../store/slices/user.slice";

export type ProfileType = {
    id: string;
    userId: string;
    gender: string;
    dob: string;
    bioHead: string;
    bioText: string;
    avatar: string;
    createdAt: string;
}

export type ProfileLinkType = {
    id: string;
    profileId: string;
    title: string;
    url: string;
    createdAt: string;
}

export type ProfileResponseType = {
    success: boolean;
    message: string;
    data: {
        user: UserType;
        profile: ProfileType;
        profileLinks: ProfileLinkType[];
    };
}

export type LocationType = {
    place_id: number;
    display_name: string;
}


export type EditProfileFormData = {
    name: string;
    user_name: string;
    bioHead: string;
    bioText: string;
    location: string;
    gender: string;
    dob: string;
    avatar?: File;
}