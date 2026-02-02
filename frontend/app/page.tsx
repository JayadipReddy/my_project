import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-10 py-20 px-10 bg-white dark:bg-black">

        {/* Centered Logo */}
        <Image
          className="dark:invert"
          src="/logo.png"
          alt="EM logo"
          width={200}
          height={100}
          priority
        />
        
        {/* Centered Heading */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            To get started, click the login button below      
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Click the Login button below
          </p>
        </div>

        {/* Centered Login Button */}
        <div className="flex justify-center">
          <Link
            href="/Login"
            className="flex h-12 w-40 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-neutral-800"
          >
            Login
          </Link>
        </div>

      </main>
    </div>
  );
}
