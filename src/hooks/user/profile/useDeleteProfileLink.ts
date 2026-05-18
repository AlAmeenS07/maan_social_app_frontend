import { useMutation } from "@tanstack/react-query";
import { deleteProfileLinkApi } from "../../../api/user/profile.api";
import toast from "react-hot-toast";
import type { ProfileLinkType } from "../../../types/user/user.profile";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";


export const useDeleteProfileLink = ({setSocialLinks , remove} : {setSocialLinks : React.Dispatch<React.SetStateAction<ProfileLinkType[]>> , remove : any}) => {

    return useMutation({
        mutationFn: ({linkId} : {linkId : string}) => deleteProfileLinkApi(linkId),

        onSuccess: (res, variables) => {
            if (res.success) {
                toast.success(res.message);
                setSocialLinks((prev) => {
                    return prev.filter(p => p.id != variables.linkId)
                })
                remove(variables.linkId)
            }
        },

        onError: (error) => {
            commonErrorHandler(error)
        }
    });
};