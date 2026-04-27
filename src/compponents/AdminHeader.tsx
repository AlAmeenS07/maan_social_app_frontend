// components/layout/Header.jsx
export default function AdminHeader() {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-end items-center">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">Maan</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>

        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
}