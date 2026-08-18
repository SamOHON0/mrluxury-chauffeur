"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { whatsappLink } from "@/lib/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hi, I'd like to enquire about a chauffeur booking.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] p-3 shadow-lg shadow-black/40 transition-transform hover:scale-105 active:scale-95"
    >
      <WhatsappLogo size={28} weight="fill" className="text-white" />
    </a>
  );
}
