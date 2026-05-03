
import AvatarGroup from './AvatarGroup'

const RegistrationBanner = () => {
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-purple-100 to-purple-200 flex items-center justify-center p-8">

            <div className="max-w-md text-center lg:text-left">

                <h1 className="text-4xl font-bold leading-tight">
                    Join MaaN
                    <span className="text-purple-600 block">
                        Build your network.
                    </span>
                </h1>

                <p className="mt-4 text-gray-700">
                    The world's first multi-layered identity platform.
                    Create, connect, and monetize your presence
                    without leaving your unique voice.
                </p>

                <div className="mt-6">
                    <AvatarGroup />
                </div>

            </div>

        </div>
    )
}

export default RegistrationBanner