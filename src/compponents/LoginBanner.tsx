
const LoginBanner = () => {
    return (
        <div className="bg-gradient-to-b from-purple-100 to-purple-200 flex items-center justify-center p-12">
            <div className="max-w-md">

                {/* TAG */}
                <p className="text-xs font-semibold text-purple-600 bg-purple-100 inline-block px-3 py-1 rounded-full">
                    WELCOME BACK
                </p>

                {/* TITLE */}
                <h1 className="text-3xl font-bold mt-4 leading-snug">
                    Log in to your{" "}
                    <span className="text-purple-600">MaaN account</span>
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                    Access your MaaN profile, connect with your audience,
                    and continue building your digital identity seamlessly.
                </p>

                {/* FEATURES */}
                <div className="mt-8 space-y-4">

                    <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                            🚀
                        </div>
                        <div>
                            <p className="font-medium text-sm">Seamless Access</p>
                            <p className="text-xs text-gray-500">
                                Jump right back into your creator dashboard.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                            🔒
                        </div>
                        <div>
                            <p className="font-medium text-sm">Secure Login</p>
                            <p className="text-xs text-gray-500">
                                Your account is protected with advanced security.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginBanner