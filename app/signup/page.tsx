"use client";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { NavbarButtons } from "@/types/navbar";

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
  const [success, setSuccess] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const signup = async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });
      setLoading(false);

      if (error) {
        setError(error.message);
        setSuccess(null);
        throw error;
      }

      if (data) {
        setSuccess("Account created. Check your email for confirmation.");
        setError(null);
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  return (
    <div className="utt-dark">
      <Navbar buttons={buttons} />
      <div className="min-h-screen bg-slate-800 text-gray-100">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-amber-500 pb-10">Sign Up</h1>
          <form className="flex flex-col space-y-4 max-w-lg">
            <Input
              classNames={{
                inputWrapper: "bg-gray-800",
                innerWrapper: "bg-gray-800",
              }}
              color="primary"
              errorMessage={error ? "Please try again" : false}
              id="email"
              isInvalid={!!error}
              label="Email"
              type="email"
              value={credentials.email}
              variant="faded"
              width="w-72"
              onChange={handleChange}
            />
            <Input
              classNames={{
                inputWrapper: "bg-gray-800",
                innerWrapper: "bg-gray-800",
              }}
              color="primary"
              errorMessage={error ? "Please try again" : false}
              id="password"
              isInvalid={!!error}
              label="Password"
              type="password"
              value={credentials.password}
              variant="faded"
              width="w-72"
              onChange={handleChange}
            />

            <div className="w-72 pt-10">
              <Button
                className="p-2 bg-amber-500 text-gray-800 font-bold rounded-lg w-full"
                isLoading={loading}
                onClick={signup}
              >
                Sign Up
              </Button>
            </div>
          </form>
          {success && <p className="text-emerald-400 mt-10">{success}</p>}
        </div>
      </div>
    </div>
  );
}
