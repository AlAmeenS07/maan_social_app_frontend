// components/AvatarGroup.tsx
export default function AvatarGroup() {
  const avatars = [
    "https://i.pravatar.cc/40?img=1",
    "https://i.pravatar.cc/40?img=2",
    "https://i.pravatar.cc/40?img=3",
    "https://i.pravatar.cc/40?img=4",
  ];

  return (
    <div className="flex items-center gap-2 mt-6">
      <div className="flex -space-x-2">
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src}
            className="w-8 h-8 rounded-full border-2 border-white"
          />
        ))}
      </div>
      <p className="text-sm text-gray-600">
        Joined by <span className="font-semibold">500k+</span> creators
      </p>
    </div>
  );
}