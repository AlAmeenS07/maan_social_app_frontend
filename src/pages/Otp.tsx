// pages/Otp.tsx
import { useEffect, useRef, useState } from "react";
import Card from "../compponents/Card";
import Button from "../compponents/Button";

export default function Otp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [time, setTime] = useState(60);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // TIMER
  useEffect(() => {
    if (time === 0) return;
    const timer = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  // INPUT CHANGE
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  // BACKSPACE
  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const resendOtp = () => {
    setTime(60);
    console.log("Resend OTP");
  };

  const submit = () => {
    console.log(otp.join(""));
  };

  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* LEFT SIDE */}
      <div className="bg-gray-100 flex items-center justify-center p-12">
        <div className="max-w-md">

          {/* TAG */}
          <p className="text-xs font-semibold text-purple-600 bg-purple-100 inline-block px-3 py-1 rounded-full">
            IDENTITY SECURED
          </p>

          {/* TITLE */}
          <h1 className="text-3xl font-bold mt-4 leading-snug">
            Confirm your{" "}
            <span className="text-purple-600">email address</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            We've sent a 6-digit verification code to{" "}
            <b>alex.design@maa-n.io</b>.  
            Enter it below to verify your identity and unlock your creator account.
          </p>

          {/* FEATURES */}
          <div className="mt-8 space-y-4">

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                🔒
              </div>
              <div>
                <p className="font-medium text-sm">Enhanced Security</p>
                <p className="text-xs text-gray-500">
                  Multi-layer protection for your creator profile.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                ⚡
              </div>
              <div>
                <p className="font-medium text-sm">Instant Access</p>
                <p className="text-xs text-gray-500">
                  Unlock all features immediately after verification.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

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
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
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
              onClick={resendOtp}
              className="text-purple-600 text-sm mb-4 block mx-auto hover:underline"
            >
              Resend OTP
            </button>
          )}

          <Button onClick={submit} className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90">
            Verify Now →
          </Button>


        </Card>
      </div>
    </div>
  );
}