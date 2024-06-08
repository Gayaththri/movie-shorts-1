import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();

  return (
    <nav className="border-b bg-background h-[10vh] flex items-center">
      {/* Div for the left side */}
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">MovieShorts</h1>
        </Link>
      </div>

      {/* Div for the right side */}
      <div className="flex items-center gap-x-5 pr-5">
        {(await isAuthenticated()) ? (
          <LogoutLink>
            <Button>Log out</Button>
          </LogoutLink>
        ) : (
          <div className="flex items-center gap-x-5 pr-5">
            <LoginLink>
              <Button>Log In</Button>
            </LoginLink>
            <RegisterLink>
              <Button variant="secondary">Sign Up</Button>
            </RegisterLink>
          </div>
        )}
      </div>
    </nav>
  );
}
