"use client";

export default function MediaPreview({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) {
  const isVideo = file.type.startsWith("video");

  return (
    <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">

  {isVideo ? (
    <video
      src={URL.createObjectURL(file)}
      className="w-full h-full object-cover"
    />
  ) : (
    <img
      src={URL.createObjectURL(file)}
      className="w-full h-full object-cover"
    />
  )}

  {/* Soft Overlay on Hover */}
  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

  {/* Remove Button */}
  <button
    onClick={onRemove}
    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-gray-700 shadow-md hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
  >
    ✕
  </button>

</div>
  );
}