
import { auth0 } from "@/lib/auth0";

import { GetServerSidePropsResultWithSession } from "@auth0/nextjs-auth0/server";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth0.getSession();
  // If no session, show sign-up and login buttons
  if (!session) {
    return redirect("/auth/login?returnTo=/dashboard") 
  }
    
  return redirect("/dashboard")
}
