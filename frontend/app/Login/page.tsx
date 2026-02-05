"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [randomText, setRandomText] = useState("");


  // popup visibility
  const [showConsent, setShowConsent] = useState(true);
  const [showCustomize, setShowCustomize] = useState(false);

  // custom cookie states
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // ---- LOGIN HANDLER (UNCHANGED) ----
  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Login successful!!");
      } else {
        alert(data.message || "Invalid credentials ❌");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };

  // ---- SEND CONSENT TO BACKEND ----
  const sendConsent = async (payload: any) => {
    try {
      await fetch("http://127.0.0.1:8000/cookie-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Cookie consent API failed");
    }

    setShowConsent(false);
    setShowCustomize(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-black">
      <main className="w-full max-w-md rounded-lg bg-white p-10 shadow-lg dark:bg-zinc-900">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
          priority
        />

        <h1 className="mb-5 text-center text-2xl font-semibold text-black dark:text-white">
          Login 
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-zinc-300 p-2 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border border-zinc-300 p-2 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

            {/* <input
              type="text"
              placeholder="Comments"
              className="w-full rounded-md border border-zinc-300 p-2 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              value={randomText}
              onChange={(e) => setRandomText(e.target.value)}
            /> */}


          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-blue-600 p-3 text-white transition-all hover:bg-blue-700"
          >
            Login
          </button>

          <Link
            href="/"
            className="w-full rounded-md border border-black bg-white p-2 text-black text-center transition-all hover:bg-black hover:text-white"
          >
            Home
          </Link>
        </form>
      </main>

      {/* ---- COOKIE CONSENT POPUP ---- */}
      {showConsent && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-gray-300 rounded-lg px-5 py-4 shadow-lg max-w-md w-[90%]">
          {!showCustomize ? (
            <>
              <p className="text-sm text-gray-700 mb-3">
                We use cookies to improve your experience.
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => sendConsent({ type: "REJECT" })}
                  className="rounded border border-gray-400 bg-transparent px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Reject All
                </button>

                <button
                  onClick={() => setShowCustomize(true)}
                  className="rounded border border-gray-400 px-4 py-1.5 text-sm"
                >
                  Customize
                </button>

                <button
                  onClick={() => sendConsent({ type: "ALL" })}
                  className="rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700"
                >
                  Accept All
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm font-medium mb-2">Customize cookies</p>

              <label className="flex items-center gap-2 text-sm mb-1">
                <input type="checkbox" checked disabled />
                Necessary (always enabled)
              </label>

              <label className="flex items-center gap-2 text-sm mb-1">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                Analytics
              </label>

              <label className="flex items-center gap-2 text-sm mb-3">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
                Marketing
              </label>

              <div className="flex justify-end">
                <button
                  onClick={() =>
                    sendConsent({
                      type: "CUSTOM",
                      analytics,
                      marketing,
                    })
                  }
                  className="rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700"
                >
                  Save Preferences
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
