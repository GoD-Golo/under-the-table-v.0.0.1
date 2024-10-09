import Navbar from "@/components/Navbar";
import { NavbarButtons } from "@/utils/types";
import StyledInput from "@/components/ui/StyledInput";

const buttons: NavbarButtons[] = [
  {
    text: "Sign Up",
    link: "signup",
    type: "primary",
  },
];

export default function SignIn() {
  return (
    <div>
      <Navbar buttons={buttons} />
      <div className="min-h-screen bg-slate-800 text-gray-100">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-amber-500 pb-10">Sign In</h1>
          <form className="flex flex-col space-y-4 max-w-lg">
            <StyledInput
              type="text"
              label="Username"
              id="username"
              width="w-72"
            />
            <StyledInput
              type="password"
              label="Password"
              id="password"
              width="w-72"
            />

            <div className="w-72 pt-10">
              <button className="p-2 bg-amber-500 text-gray-800 font-bold rounded-lg w-full">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
