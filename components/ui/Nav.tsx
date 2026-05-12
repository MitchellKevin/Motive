"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const path = usePathname();
  const isLight = path === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      <Link href="/" className="flex items-center gap-1">
        <span className="text-sm font-black tracking-widest uppercase">Motive</span>
      </Link>

      <nav className="flex items-center gap-8">
        {[
          { href: "/", label: "Home" },
          { href: "/quiz", label: "Find My Car" },
          { href: "/compare", label: "Compare" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-xs tracking-widest uppercase transition-opacity ${
              path === href ? "opacity-100" : "opacity-40 hover:opacity-70"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
