
const ResetPasswordBanner = () => {
    return (
        <div className="bg-gradient-to-b from-purple-100 to-purple-200 flex items-center justify-center p-12">
            <div className="max-w-md">

                {/* TAG */}
                <p className="text-xs font-semibold text-purple-600 bg-purple-100 inline-block px-3 py-1 rounded-full">
                    PASSWORD RESET
                </p>

                {/* TITLE */}
                <h1 className="text-3xl font-bold mt-4 leading-snug">
                    Create a new{" "}
                    <span className="text-purple-600">password</span>
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                    Your new password must be different from previously used passwords.
                    Keep it strong and secure to protect your account.
                </p>

                {/* FEATURES */}
                <div className="mt-8 space-y-4">

                    <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                            🔐
                        </div>
                        <div>
                            <p className="font-medium text-sm">Strong Security</p>
                            <p className="text-xs text-gray-500">
                                Protect your account with a strong password.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                            ⚡
                        </div>
                        <div>
                            <p className="font-medium text-sm">Quick Update</p>
                            <p className="text-xs text-gray-500">
                                Change your password instantly and continue.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ResetPasswordBanner