import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import type { ProfileLinkType } from "../types/user/user.profile";
import { useAddProfileLinks } from "../hooks/user/profile/useAddProfileLinks";
import Button from "./Button";
import { useEditProfileLinks } from "../hooks/user/profile/useEditProfileLinks";
import { useDeleteProfileLink } from "../hooks/user/profile/useDeleteProfileLink";

export type SocialLinkType = {
    title: string;
    url: string;
    id?: string
    linkId?: string;
};

type FormValues = {
    socialLinks: SocialLinkType[];
};

type SocialLinksModificationProps = {
    open: boolean;
    mode: "add" | "edit";
    initialData?: SocialLinkType[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSocialLinks : React.Dispatch<React.SetStateAction<ProfileLinkType[]>>
};

export const SocialLinksModification = ({ open, mode, initialData = [], setOpen, setSocialLinks }: SocialLinksModificationProps) => {

    const { control, register, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: {
            socialLinks:
                mode === "edit" && initialData.length > 0
                    ? initialData
                    : [{ title: "", url: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "socialLinks", keyName: "fieldId" });

    useEffect(() => {
        reset({
            socialLinks:
                mode === "edit" && initialData.length > 0
                    ? initialData
                    : [{ title: "", url: "" }],
        });
    }, [initialData, mode, reset]);

    const { mutate: addProfileLinks, isPending: addingPending } = useAddProfileLinks({setSocialLinks})
    const { mutate: editProfileLinks, isPending: editingPending } = useEditProfileLinks({setSocialLinks})
    const { mutate: deleteProfileLink} = useDeleteProfileLink({setSocialLinks, remove})

    const submitHandler = async(values: FormValues) => {
        console.log(values.socialLinks)
        if (mode == "add") {
            await addProfileLinks(values.socialLinks)
        }
        if(mode == "edit"){
            await editProfileLinks(values.socialLinks)
        }
        setOpen(false)
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl">

                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-purple-700">
                        {mode === "add" ? "Add Social Links" : "Edit Social Links"}
                    </h2>

                </div>

                <form onSubmit={handleSubmit(submitHandler)}>

                    <div className="space-y-4">
                        {fields.map((field, index) => {
                        return(
                            <div
                                key={field.id}
                                className="flex w-full items-center gap-3"
                            >
                                {/* Title Input */}
                                <input
                                    {...register(`socialLinks.${index}.title`, {
                                        required: true,
                                    })}
                                    placeholder="Title"
                                    className="w-[30%] rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition"
                                />

                                {/* URL Input */}
                                <input
                                    {...register(`socialLinks.${index}.url`, {
                                        required: true,
                                    })}
                                    placeholder="URL"
                                    className="flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition"
                                />

                                {/* Remove Button only in edit */}
                                {mode === "edit" && (
                                    <button
                                        type="button"
                                        onClick={async() => {
                                            await deleteProfileLink({linkId : field?.id as string})
                                        }}
                                        className="rounded-xl bg-red-100 px-3 py-3 text-red-600 hover:bg-red-200 transition"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        )}
                    )}
                    </div>

                    {/* Add More */}
                    {mode == "add" &&
                        <button
                            type="button"
                            onClick={() => append({ title: "", url: "" })}
                            className="mt-4 rounded-xl bg-purple-100 px-4 py-2 font-medium text-purple-700 hover:bg-purple-200 transition"
                        >
                            + Add More
                        </button>
                    }

                    {/* Footer */}
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="rounded-xl border border-red-200 px-5 py-2 text-red-600 hover:bg-red-50 transition"
                        >
                            Cancel
                        </button>

                        <Button
                            type="submit"
                            isLoading={mode == "add" ? addingPending : editingPending}
                            loadingText="Saving..."
                            className="rounded-xl bg-purple-600 px-5 py-2.5 text-white hover:bg-purple-700 transition disabled:opacity-70"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SocialLinksModification;