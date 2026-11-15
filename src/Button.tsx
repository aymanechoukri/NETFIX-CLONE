"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";

interface WatchButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function WatchButton({ onClick, children }: WatchButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Watch movie or preview information"
        className="bg-white/30 px-5 py-2 rounded-lg backdrop-blur-lg active:scale-95 transition duration-300 cursor-pointer font-extrabold hover:bg-white/40 text-white"
      >
        {children || "Watch Now"}
      </button>

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="watch-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <div className="bg-[#1f1f1f] border border-gray-700 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#A2226E]/20 text-[#00E5FF] rounded-full">
                <Info size={24} />
              </div>
              <h3 id="watch-dialog-title" className="text-xl font-bold">
                Educational Demo
              </h3>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Stream Flex is an open-source educational portfolio project powered by the TMDB API.
              It does not host, stream, or distribute copyrighted video media, nor does it require
              any user registration, payment, or software download.
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gradient-to-r from-[#A2226E] to-[#00E5FF] text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
