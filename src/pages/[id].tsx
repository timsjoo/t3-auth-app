import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";

const Profile = () => {
  const { data: session, status } = useSession();
  const { data } = trpc.auth.getSecretMessage.useQuery();

  const router = useRouter();
  const id = router.query.id as string;

  console.log(session);
  //useEffect(() => {
  // if (!session) {
  //   router.push("/");
  // }
  //}, [session, router]);

  if (status === "loading") {
    return (
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 text-lg">
        loading...
      </main>
    );
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  console.log(["after profile load", session]);

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <section>
      <h2>Profile Page for {id}</h2>
      <h3>{session?.user?.email}</h3>
      <h3>{session?.user?.name}</h3>
      <h3> {data} </h3>
      <Link href={"/"}>Home Page</Link>
      <button onClick={handleSignOut}>Sign Out</button>
    </section>
  );
};

export default Profile;
