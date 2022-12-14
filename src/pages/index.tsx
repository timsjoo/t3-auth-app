import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { useRouter } from "next/router";

import { trpc } from "../utils/trpc";

// import router useRouter

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const { data: session, status } = useSession();
  console.log(["on index page", session]);

  // if (session.isNotFuckingAuthed) router.push("/some-where-else");

  /// DONT DO ALL THIS

  return (
    <>
      <Head>
        <title>T3 Auth App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        {/* <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Create <span className="text-purple-300">T3</span> App
        </h1>
        <AuthShowcase /> */}

        {session ? <User session={session} /> : <Guest />}
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl text-blue-500">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
      {secretMessage && (
        <p className="text-2xl text-blue-500">{secretMessage}</p>
      )}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

const Guest: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();
  console.log(secretMessage);
  return (
    <main className="container mx-auto py-20 text-center">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>
      <div className="flex justify-center">
        <Link href={"/login"}>Sign In</Link>
      </div>
    </main>
  );
};

const User = ({ session }: { session: Session }) => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();
  console.log(secretMessage);
  return (
    <main className="container mx-auto py-20 text-center">
      <h3 className="text-4xl font-bold">Authorized User Homepage</h3>

      <div className="details">
        <h5>{session?.user?.name}</h5>
        <h5>{session?.user?.email}</h5>
      </div>

      <div>
        <button
          className="mt-5 rounded-sm bg-indigo-500 bg-gray-50 px-10 py-1"
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link href={`/${session?.user?.name}`}>Profile</Link>
      </div>
    </main>
  );
};
