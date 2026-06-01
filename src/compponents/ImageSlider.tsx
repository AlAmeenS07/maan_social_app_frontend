import { useState } from "react";

type Props = {
    images: string[];
    className?: string;
};

export default function ImageSlider({images, className = ""}: Props) {

    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images?.length) return null;

    const next = () => {
        setCurrentIndex((prev) =>
            prev === images.length - 1
                ? 0
                : prev + 1
        );
    };

    const prev = () => {
        setCurrentIndex((prev) =>
            prev === 0
                ? images.length - 1
                : prev - 1
        );
    };

    return (
        <div className="relative">

            <img
                src={images[currentIndex]}
                alt=""
                className={`w-full object-cover ${className}`}
            />

            {/* LEFT */}
            {images.length > 1 && (
                <button
                    onClick={prev}
                    className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        w-10
                        h-10
                        rounded-full
                        bg-black/50
                        text-white
                    "
                >
                    ←
                </button>
            )}

            {/* RIGHT */}
            {images.length > 1 && (
                <button
                    onClick={next}
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        w-10
                        h-10
                        rounded-full
                        bg-black/50
                        text-white
                    "
                >
                    →
                </button>
            )}

            {/* COUNTER */}
            {images.length > 1 && (
                <div
                    className="
                        absolute
                        top-4
                        right-4
                        bg-black/60
                        text-white
                        px-3
                        py-1
                        rounded-full
                        text-sm
                    "
                >
                    {currentIndex + 1} / {images.length}
                </div>
            )}

            {/* DOTS */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">

                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                setCurrentIndex(index)
                            }
                            className={`
                                w-2
                                h-2
                                rounded-full
                                ${
                                    currentIndex === index
                                        ? "bg-white"
                                        : "bg-white/50"
                                }
                            `}
                        />
                    ))}

                </div>
            )}

        </div>
    );
}