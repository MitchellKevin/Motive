"use client";
import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function CarImage({ src, alt, className = "", priority = false }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`bg-border flex items-center justify-center ${className}`}>
        <svg
          className="w-16 h-16 text-muted opacity-30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 9l-3-6H8L5 9H2v12h20V9h-3zM8 9l2-4h4l2 4H8zm4 8a3 3 0 100-6 3 3 0 000 6z"
          />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      onError={() => setError(true)}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
    />
  );
}
