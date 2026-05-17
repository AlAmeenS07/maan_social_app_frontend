import React, { type RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, handler: React.Dispatch<React.SetStateAction<boolean>>) {

    useEffect(() => {

        const listener = (event: MouseEvent) => {
            if (!ref.current) return;
            if (!ref.current.contains(event.target as Node)) {
                handler(false);
            }
        };

        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener("mousedown",listener);
        };

    }, [ref, handler]);
}