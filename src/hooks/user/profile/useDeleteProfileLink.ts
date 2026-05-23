import { useMutation } from "@tanstack/react-query";
import { deleteProfileLinkApi } from "../../../api/user/profile.api";
import toast from "react-hot-toast";
import type { ProfileLinkType } from "../../../types/user/user.profile";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";
import type { UseFieldArrayRemove } from "react-hook-form";


export const useDeleteProfileLink = ({setSocialLinks , remove} : {setSocialLinks : React.Dispatch<React.SetStateAction<ProfileLinkType[]>> , remove : UseFieldArrayRemove}) => {

    return useMutation({
        mutationFn: ({linkId} : {linkId : string , index : number}) => deleteProfileLinkApi(linkId),

        onSuccess: (res, variables) => {
            if (res.success) {
                toast.success(res.message);
                setSocialLinks((prev) => {
                    return prev.filter(p => p.id != variables.linkId)
                })
                remove(variables.index)
            }
        },

        onError: (error) => {
            commonErrorHandler(error)
        }
    });
};