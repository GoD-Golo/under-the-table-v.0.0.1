"use client";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import { NavbarButtons } from "@/types/navbar";
import StyledInput from "@/components/ui/StyledInput";
import { supabase } from "@/lib/supabase";

const buttons: NavbarButtons[] = [
  {
    text: "Sign In",
    link: "signin",
    type: "primary",
  },
];

export default function SignUp() {
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(credentials);
    try {
      let { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        setError(error.message);
        setSuccess(null);
      }

      if (data.user) {
        setSuccess(
          "Sign Up successful. Please check your email for verification link."
        );
        setError(null);
      } else {
        setError("Unexpected error. Please try again.");
        setSuccess(null);
      }

      if (data) console.log(data);
    } catch (error) {
      setError("Unexpected error. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
    console.log(credentials);
  };

  return (
    <div>
      <Navbar buttons={buttons} />
      <div className="min-h-screen bg-slate-800 text-gray-100">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-amber-500 pb-10">Sign Up</h1>
          <form onSubmit={signup} className="flex flex-col space-y-4 max-w-lg">
            <StyledInput
              type="email"
              label="Email"
              id="email"
              value={`${credentials.email}`}
              width="w-72"
              onChange={handleChange}
            />
            <StyledInput
              type="password"
              label="Password"
              id="password"
              value={`${credentials.password}`}
              width="w-72"
              onChange={handleChange}
            />

            <div className="w-72 pt-10">
              <button className="p-2 bg-amber-500 text-gray-800 font-bold rounded-lg w-full">
                Sign Up
              </button>
            </div>
          </form>
          {success && <p className="text-emerald-400 mt-4">{success}</p>}
          {error && <p className="text-rose-600 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}
