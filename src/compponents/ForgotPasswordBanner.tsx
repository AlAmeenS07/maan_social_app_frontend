
const ForgotPasswordBanner = () => {
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-purple-100 to-purple-200 flex items-center justify-center p-8">

            <div className="max-w-md">

                <p className="text-xs font-semibold text-purple-600 bg-purple-100 inline-block px-3 py-1 rounded-full">
                    ACCOUNT RECOVERY
                </p>

                <h1 className="text-3xl font-bold mt-4 leading-snug">
                    Reset your{" "}
                    <span className="text-purple-600">password</span>
                </h1>

                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                    Forgot your password? No worries. Enter your registered email
                    and we’ll send you a secure link to reset your credentials.
                </p>

                <div className="mt-8 space-y-4">

                    <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                            🔐
                        </div>
                        <div>
                            <p className="font-medium text-sm">Secure Recovery</p>
                            <p className="text-xs text-gray-500">
                                Your data stays protected with encrypted reset links.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                            ⚡
                        </div>
                        <div>
                            <p className="font-medium text-sm">Quick Process</p>
                            <p className="text-xs text-gray-500">
                                Reset your password in just a few steps.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordBanner