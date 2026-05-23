import { useMutation } from "@tanstack/react-query";
import { addProfileLinksApi } from "../../../api/user/profile.api";
import toast from "react-hot-toast";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";
import type React from "react";
import type { ProfileLinkType } from "../../../types/user/user.profile";



export const useAddProfileLinks = ({setSocialLinks} : {setSocialLinks : React.Dispatch<React.SetStateAction<ProfileLinkType[]>>}) => {

    return useMutation({
        mutationFn: addProfileLinksApi,

        onSuccess: (res) => {
            if (res.success) {
                toast.success(res.message);
                setSocialLinks((prev) => {
                    return [...prev, ...res.data]
                })
            }
        },

        onError: (error) => {
            commonErrorHandler(error)
        }
    });
};