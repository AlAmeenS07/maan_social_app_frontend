
const OtpBanner = ({email} : {email : string}) => {
    return (
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
                    <b>{email || 'sample@gmail.com'}</b>.
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
    )
}

export default OtpBanner