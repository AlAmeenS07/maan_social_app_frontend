import type { Dispatch, MutableRefObject, SetStateAction } from "react";

type InputRefs = MutableRefObject<(HTMLInputElement | null)[]>;

export const getInitialTime = (OTP_KEY: string) => {
    const stored = localStorage.getItem(OTP_KEY);

    if (!stored) return 0;

    const expiry = parseInt(stored, 10);
    const diff = Math.floor((expiry - Date.now()) / 1000);

    return diff > 0 ? diff : 0;
};


export const handleChange = (value: string, index: number, setOtp: Dispatch<SetStateAction<string[]>>, otp: string[], inputs: InputRefs) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
        inputs.current[index + 1]?.focus();
    }
};

export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number, otp: string[], inputs: InputRefs) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputs.current[index - 1]?.focus();
    }
};


export const resendOtp = async (
    OTP_KEY : string , 
    setOtp : Dispatch<SetStateAction<string[]>> , 
    setTime : Dispatch<SetStateAction<number>> , 
    setResend : Dispatch<SetStateAction<boolean>> , 
    resendOtpMutate : (email : string) => void,
    email : string
) => {
    const expiry = Date.now() + 60 * 1000;
    localStorage.setItem(OTP_KEY, expiry.toString());

    setOtp(["", "", "", "", "", ""]);
    setTime(60);
    setResend(true)

    resendOtpMutate(email)
};
