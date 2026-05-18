import type { ProfileLinkType } from "../types/user/user.profile";


interface Props {
    open: boolean;
    onClose: () => void;
    links: ProfileLinkType[];
}

export default function SocialLinksModal({ open, onClose, links }: Props) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

            {/* BACKDROP */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40"
            />

            {/* MODAL */}
            <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-xl font-bold text-gray-800">
                        Social Links
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500"
                    >
                        ×
                    </button>

                </div>

                {/* LINKS */}
                <div className="space-y-4">

                    {links?.length == 0 ? <p className="text-gray-600 text-sm">No links found !</p>
                        :
                        links?.map((item) => (
                            <div
                                key={item?.id}
                                className="flex items-center justify-between border rounded-xl px-4 py-3"
                            >

                                <div>
                                    <h3 className="font-semibold text-gray-800 capitalize">
                                        {item?.title}
                                    </h3>

                                    <a
                                        href={item?.url}
                                        target="_blank"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {item?.url}
                                    </a>
                                </div>

                            </div>
                        ))}

                </div>

            </div>
        </div>
    );
}