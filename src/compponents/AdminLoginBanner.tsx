

const AdminLoginBanner = () => {
  return (
    <div className="h-full w-full bg-gradient-to-b from-green-100 to-green-200 flex items-center justify-center p-12">
      <div className="max-w-md">

        {/* TAG */}
        <p className="text-xs font-semibold text-green-700 bg-green-100 inline-block px-3 py-1 rounded-full">
          ADMIN ACCESS
        </p>

        {/* TITLE */}
        <h1 className="text-3xl font-bold mt-4 leading-snug">
          Manage and monitor the{" "}
          <span className="text-green-600">MaaN platform</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-4 text-gray-700 text-sm leading-relaxed">
          Access the admin dashboard to oversee users, moderate content,
          track activity, and ensure the platform runs smoothly and securely.
        </p>

        {/* FEATURES */}
        <div className="mt-8 space-y-4">

          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-lg">
              👥
            </div>
            <div>
              <p className="font-medium text-sm">User Management</p>
              <p className="text-xs text-gray-500">
                Control accounts, roles, and platform access.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-lg">
              🛡️
            </div>
            <div>
              <p className="font-medium text-sm">Moderation & Security</p>
              <p className="text-xs text-gray-500">
                Monitor activity and enforce platform policies.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-lg">
              📊
            </div>
            <div>
              <p className="font-medium text-sm">Insights & Control</p>
              <p className="text-xs text-gray-500">
                Track performance, reports, and system health.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLoginBanner;