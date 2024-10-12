"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import { NavbarButtons } from "@/types/navbar";

const buttons: NavbarButtons[] = [
  {
    text: "Characters",
    link: "",
    type: "secondary",
  },
  {
    text: "Campaigns",
    link: "",
    type: "secondary",
  },
  {
    text: "Homebrew",
    link: "",
    type: "secondary",
  },
];

export default function UserId() {
  const router = useRouter();
  const userId = useSearchParams().get("userId");

  return (
    <div className="min-h-screen bg-slate-800 text-gray-100">
      <Navbar buttons={buttons} />
      <div className="flex justify-center items-center h-full">
        <h1 className="text-4xl">User Page</h1>
      </div>
    </div>
  );
}
