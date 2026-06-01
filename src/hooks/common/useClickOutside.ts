import { type RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, onOutsideClick: () => void) {
    useEffect(() => {

        const listener = (event: MouseEvent) => {

            if (!ref.current) return;

            if (!ref.current.contains(event.target as Node)) {
                onOutsideClick();
            }

        };

        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
        };

    }, [ref, onOutsideClick]);
}