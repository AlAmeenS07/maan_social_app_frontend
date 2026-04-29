// pages/Otp.tsx
import { useEffect, useRef, useState } from "react";
import Card from "../../compponents/Card";
import Button from "../../compponents/Button";
import OtpBanner from "../../compponents/OtpBanner";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getInitialTime, handleChange, handleKeyDown, resendOtp } from "../../helpers/auth.helper";
import { useVerifyOtp } from "../../hooks/user/auth/useVeriftyOtp";
import { useResendOtp } from "../../hooks/user/auth/useResendOtp";
import { useForgotPasswordVerifyOtp } from "../../hooks/user/auth/useForgotPasswordVerifyOtp";

export default function Otp() {

  const [searchParams] = useSearchParams()
  const email = searchParams.get("email")
  const fp = searchParams.get("fp")

  const { mutate : verifyOtpMutate, isPending } = useVerifyOtp()
  const {mutate : resendOtpMutate} = useResendOtp()
  const {mutate : forgotPasswordVerifyOtpMutate} = useForgotPasswordVerifyOtp()

  const OTP_KEY = "otp_expiry";

  const [time, setTime] = useState(() => getInitialTime(OTP_KEY));
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [resend, setResend] = useState(false)
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      const stored = localStorage.getItem(OTP_KEY);

      if (!stored) {
        setTime(0);
        return;
      }

      const expiry = parseInt(stored, 10);
      const diff = Math.floor((expiry - Date.now()) / 1000);

      if (diff <= 0) {
        localStorage.removeItem(OTP_KEY);
        setResend(false)
        setTime(0);
        clearInterval(timer);
      } else {
        setTime(diff);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [resend]);


  const submit = async () => {
    const otpStr = otp.join("")
    if (otpStr.length != 6) {
      return toast.error("Enter valid otp !")
    }
    if (fp == "true") {
      return forgotPasswordVerifyOtpMutate({ email: email as string, otp: otpStr })
    }
    verifyOtpMutate({ email: email as string, otp: otpStr })
  };

  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* LEFT SIDE */}
      <OtpBanner email={email as string} />

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center">
        <Card>
          <h2 className="text-lg font-semibold text-center mb-2">
            Verification Code
          </h2>

          <p className="text-center mb-4 text-gray-500 text-sm">
            Enter the 6-digit code sent to your email
          </p>

          {/* OTP INPUTS */}
          <div className="flex justify-between gap-2 mb-5">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el: any) => (inputs.current[i] = el)}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, i, setOtp, otp, inputs)}
                onKeyDown={(e) => handleKeyDown(e, i, otp, inputs)}
                className="w-12 h-12 text-center border rounded-lg text-lg focus:ring-2 focus:ring-purple-500"
              />
            ))}
          </div>

          {/* TIMER */}
          <p className="text-center text-sm text-gray-500 mb-2">
            {time > 0
              ? `Resend available in ${time}s`
              : "Didn’t receive the code?"}
          </p>

          {/* RESEND */}
          {time === 0 && (
            <button
              onClick={() => resendOtp(OTP_KEY, setOtp, setTime, setResend, resendOtpMutate, email as string)}
              className="text-purple-600 text-sm mb-4 block mx-auto hover:underline"
            >
              Resend OTP
            </button>
          )}

          <Button
            onClick={submit}
            type="submit"
            isLoading={isPending}
            loadingText="Verifing..."
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium disabled:opacity-60 flex items-center justify-center gap-2"
          >
            Verify Now
          </Button>

        </Card>
      </div>
    </div>
  );
}