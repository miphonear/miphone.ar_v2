// app/components/Footer.jsx
import Link from "next/link";
import { Instagram, Facebook, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t shadow-[0_-1px_3px_0_rgba(0,0,0,0.04)] py-8 mt-12">
      <div className="container mx-auto px-4 text-center space-y-4">
        <p className="text-xl">
          <span className="font-medium text-gray-700">mi</span>
          <span className="font-bold text-gray-700">Phone™</span>
        </p>
        <div className="flex justify-center items-center gap-8 text-xl">
          <Link
            href="https://instagram.com/miphone.ar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram miPhone"
            className="text-gray-700 hover:text-[#ff8000] transition-colors"
          >
            <Instagram className="w-7 h-7 inline" />
          </Link>
          <Link
            href="https://www.facebook.com/miphone.argentina/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook miPhone"
            className="text-gray-700 hover:text-[#ff8000] transition-colors"
          >
            <Facebook className="w-7 h-7 inline" />
          </Link>
          <Link
            href="https://t.me/miphone_ar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram miPhone"
            className="text-gray-700 hover:text-[#ff8000] transition-colors"
          >
            <Send className="w-7 h-7 inline" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

