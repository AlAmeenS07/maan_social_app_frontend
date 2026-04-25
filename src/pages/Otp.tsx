// pages/Otp.tsx
import { useEffect, useRef, useState } from "react";
import Card from "../compponents/Card";
import Button from "../compponents/Button";
import OtpBanner from "../compponents/OtpBanner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resendOtpService, verifyOtpService } from "../services/auth.service";

export default function Otp() {

  const [searchParams] = useSearchParams()
  const email = searchParams.get("email")

  const navigate = useNavigate()
    
  const OTP_KEY = "otp_expiry";

  const getInitialTime = () => {
    const stored = localStorage.getItem(OTP_KEY);

    if (!stored) return 60;

    const expiry = parseInt(stored, 10);
    const now = Date.now();

    const diff = Math.floor((expiry - now) / 1000);

    return diff > 0 ? diff : 0;
  };

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [time, setTime] = useState(getInitialTime);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // TIMER

  useEffect(() => {
    const stored = localStorage.getItem(OTP_KEY);

    if (!stored) {
      const expiry = Date.now() + 60 * 1000;
      localStorage.setItem(OTP_KEY, expiry.toString());
    }
  }, []);

  useEffect(() => {
    if (time === 0) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(OTP_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

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

  const resendOtp = async() => {
    const expiry = Date.now() + 60 * 1000;
    localStorage.setItem(OTP_KEY, expiry.toString());
    setTime(60);

    console.log(email)

    await resendOtpService(email as string)

    console.log("Resend OTP");
  };


  const submit = async() => {
    console.log(otp)
    const otpStr = otp.join("")
    console.log(otpStr , email)
    await verifyOtpService({email : email as string , otp : otpStr} , navigate)
  };

  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* LEFT SIDE */}
      <OtpBanner email={email as string}/>

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