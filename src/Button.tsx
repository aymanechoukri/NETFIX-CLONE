"use client";

interface WatchButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function WatchButton({ onClick, children }: WatchButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      alert("Just Netflix clone");
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Watch movie"
      className="bg-white/30 px-5 py-2 rounded-lg backdrop-blur-lg active:scale-95 transition duration-300 cursor-pointer font-extrabold hover:bg-white/40"
    >
      {children || "Watch Now"}
    </button>
  );
}

