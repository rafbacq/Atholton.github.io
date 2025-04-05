'use client';

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface GoogleSignInButtonProps {
  className?: string;
  redirectUrl?: string;
}

export function GoogleSignInButton({ className, redirectUrl = '/student-home' }: GoogleSignInButtonProps) {
  const handleClick = () => {
    signIn('google', { callbackUrl: redirectUrl });
  };

  return (
    <Button
      variant="outline"
      className={`w-full flex items-center justify-center gap-2 ${className}`}
      onClick={handleClick}
    >
      <Image
        src="/google.svg"
        alt="Google logo"
        width={20}
        height={20}
      />
      Sign in with Google
    </Button>
  );
}
