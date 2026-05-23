import { useMutation } from "@tanstack/react-query";
import { editProfileLinksApi } from "../../../api/user/profile.api";
import toast from "react-hot-toast";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";
import type React from "react";
import type { ProfileLinkType } from "../../../types/user/user.profile";



export const useEditProfileLinks = ({setSocialLinks} : {setSocialLinks : React.Dispatch<React.SetStateAction<ProfileLinkType[]>>}) => {

    return useMutation({
        mutationFn: editProfileLinksApi,

        onSuccess: (res) => {
            if (res.success) {
                toast.success(res.message);
                setSocialLinks(res.data)
            }
        },

        onError: (error) => {
            commonErrorHandler(error)
        }
    });
};