"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { NavbarButtons } from "@/types/navbar";

const buttons: NavbarButtons[] = [
  {
    text: "Sign Up",
    link: "signup",
    type: "primary",
  },
];

export default function SignIn() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [success, setSuccess] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const signin = async () => {
    setLoading(true);
    try {
      if (!credentials.email || !credentials.password) {
        setError("Please fill out all fields");
        setSuccess(null);

        return;
      }
      setLoading(false);

      let { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        setError(error.message);
        setSuccess(null);
        throw error;
      }

      if (data) {
        setSuccess("Will redirect");
        setError(null);
        console.log(data);
        router.push(`/user/${data.user?.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
    setError(null);
  };

  return (
    <div>
      <Navbar buttons={buttons} />
      <div className="min-h-screen bg-slate-800 text-gray-100">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-amber-500 pb-10">Sign In</h1>
          <form className="flex flex-col space-y-4 max-w-lg">
            <Input
              classNames={{
                inputWrapper: "bg-gray-800",
                innerWrapper: "bg-gray-800",
              }}
              color="primary"
              errorMessage={error}
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
              errorMessage={error}
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
                onClick={signin}
              >
                Sign In
              </Button>
            </div>
          </form>
          {success && <p className="text-emerald-400 mt-10">{success}</p>}
        </div>
      </div>
    </div>
  );
}
