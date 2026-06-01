
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { uploadImageToS3 } from "../helpers/media.helper";
import { useCreatePost } from "../hooks/user/post/useCreatePost";
import Button from "./Button";
import { useUpdatePost } from "../hooks/user/post/useUpdatePost";

type Props = {
    editData: EditDataType | null
    open: boolean;
    onClose: () => void
}

export type EditDataType = {
    id: string
    content: string
    media: string[]
    mediaPreview: string[]
}


export default function PostModal({ editData, open, onClose }: Props) {
    const [text, setText] = useState(editData?.content || "");
    const [images, setImages] = useState<string[]>(editData?.mediaPreview || []);
    const [mediaKeys, setMediaKeys] = useState<string[]>(editData?.media || [])
    const [showEmoji, setShowEmoji] = useState(false);

    useEffect(() => {
        if (!editData) {
            setText("");
            setImages([]);
            setMediaKeys([]);
            return;
        }

        setText(editData.content);
        setImages(editData.mediaPreview);
        setMediaKeys(editData.media);
    }, [editData]);

    const { mutate: createPostMutate, isPending } = useCreatePost()
    const { mutate: updatePostMutate } = useUpdatePost()

    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!open) return null;

    const handleImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        for (const file of files) {
            const key = await uploadImageToS3(file);
            if (key) {
                setMediaKeys((prev) => [...prev, key]);
            }
            setImages((prev) => [...prev, URL.createObjectURL(file)]);
        }
        e.target.value = "";
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setMediaKeys((prev) => prev.filter((_, i) => i !== index))
    };

    const handlePost = () => {
        if (!text.trim()) return;

        if (editData) {
            updatePostMutate({ id: editData?.id, data: { content: text, media: mediaKeys } })
        }
        else {
            createPostMutate({ content: text, media: mediaKeys })
        }
        console.log("post Data", { content: text, media: mediaKeys })

        setText("");
        setImages([]);
        setMediaKeys([])
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden">

                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="font-bold text-xl">
                        {editData ? "Edit Post" : "Create Post"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-xl text-gray-500 hover:text-black"
                    >
                        ✕
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6">

                    {/* TEXT */}
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full min-h-[140px] resize-none outline-none text-gray-700"
                    />

                    {/* IMAGES */}
                    {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative"
                                >
                                    <img
                                        src={image}
                                        alt=""
                                        className="w-full h-40 object-cover rounded-xl"
                                    />

                                    <button
                                        onClick={() =>
                                            removeImage(index)
                                        }
                                        className="absolute top-2 right-2 bg-black/60 text-white w-7 h-7 rounded-full"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* EMOJI PICKER */}
                    {showEmoji && (
                        <div className="absolute bottom-16 left-0">
                            <EmojiPicker
                                width={280}
                                height={350}
                                onEmojiClick={(emoji) => setText((prev) => prev + emoji.emoji)}
                            />
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <div className="border-t p-4 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        {/* ADD IMAGE */}
                        <button
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                            className="p-2 rounded-lg hover:bg-gray-100"
                        >
                            🖼️
                        </button>

                        {/* EMOJI */}
                        <button
                            onClick={() =>
                                setShowEmoji(!showEmoji)
                            }
                            className="p-2 rounded-lg hover:bg-gray-100"
                        >
                            😊
                        </button>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            hidden
                            ref={fileInputRef}
                            onChange={handleImages}
                        />
                    </div>

                    <Button
                        isLoading={isPending}
                        onClick={handlePost}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-xl font-medium"
                    >
                        Post
                    </Button>

                </div>

            </div>

        </div>
    );
}