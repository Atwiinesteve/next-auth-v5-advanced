import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            poppins.className
          )}
        >
          🔏 Auth
        </h1>
        <p className="text-white text-lg">
          A simple authentication system using Next.js and Prisma.
        </p>
      </div>
      <LoginButton>
        <Button className="text-lg text-white">Sign in</Button>
      </LoginButton>
    </main>
  );
}
