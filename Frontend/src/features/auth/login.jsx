import { Sparkles, ArrowUpRight } from "lucide-react";

function Login() {
  return (
    <main className="min-h-dvh bg-[#f7f7f8] p-3 sm:p-5">
      <div className="mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-6xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm sm:min-h-[calc(100dvh-2.5rem)]">

        {/* Left — Hero */}
        <section className="relative hidden w-1/2 overflow-hidden bg-zinc-950 p-1 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">

          {/* Ambient Glow */}
          <div className="absolute -left-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 size-96 rounded-full bg-zinc-700/30 blur-3xl" />

          {/* AI Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-[18%] top-[22%] size-2 rounded-full bg-white" />
            <div className="absolute left-[72%] top-[18%] size-1.5 rounded-full bg-white" />
            <div className="absolute left-[82%] top-[55%] size-2 rounded-full bg-white" />
            <div className="absolute left-[28%] top-[70%] size-1.5 rounded-full bg-white" />

            <div className="absolute left-[20%] top-[23%] h-px w-40 rotate-12 bg-white/30" />
            <div className="absolute right-[18%] top-[20%] h-px w-32 -rotate-45 bg-white/20" />
            <div className="absolute bottom-[27%] left-[30%] h-px w-44 -rotate-12 bg-white/20" />
          </div>

          {/* Brand */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white text-zinc-950">
              <Sparkles size={21} strokeWidth={1.8} />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              NovaChat
            </span>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-lg">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 backdrop-blur">
              <Sparkles size={13} />
              Your intelligent AI workspace
            </div>

            <h2 className="text-4xl font-semibold leading-[1.08] tracking-tight xl:text-5xl">
              Think.
              <br />
              Create.
              <br />
              Build with AI.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-6 text-zinc-400 xl:text-base">
              Turn ideas into conversations, code, content, and
              possibilities with NovaChat.
            </p>

            {/* Visual */}
            <div className="relative mt-10 h-28 max-w-md">
              <div className="absolute left-0 top-8 flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
                <Sparkles size={22} />
              </div>

              <div className="absolute left-20 top-1 flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs text-zinc-400 backdrop-blur">
                ✦
              </div>

              <div className="absolute left-32 top-14 flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs text-zinc-500">
                ✧
              </div>

              <div className="absolute left-48 top-7 h-px w-28 rotate-[18deg] bg-gradient-to-r from-white/30 to-transparent" />

              <div className="absolute right-4 top-12 flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-300 backdrop-blur">
                <ArrowUpRight size={19} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="relative z-10 text-xs text-zinc-500">
            Built for ideas that go further.
          </p>
        </section>

        {/* Right — Login */}
        <section className="flex w-full items-center justify-center p-5 sm:p-8 lg:w-1/2 lg:p-12">
          <div className="w-full max-w-sm">

            {/* Mobile Branding */}
            <div className="mb-8 text-center lg:hidden">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                <Sparkles size={23} strokeWidth={1.8} />
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                NovaChat
              </h1>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Welcome back
              </h1>

              <p className="mt-2 text-sm leading-5 text-zinc-500">
                Sign in to continue to your workspace.
              </p>
            </div>

            {/* Google */}
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 active:scale-[0.98]"
            >
              <span className="text-sm font-semibold">G</span>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-200" />

              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                or
              </span>

              <div className="h-px flex-1 bg-zinc-200" />
            </div>

            {/* Form */}
            <form className="space-y-4">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-zinc-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-zinc-500 transition hover:text-zinc-900"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
                />
              </div>

              {/* Sign In */}
              <button
                type="submit"
                className="mt-2 h-11 w-full rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 active:scale-[0.98]"
              >
                Sign In
              </button>
            </form>

            {/* Signup */}
            <p className="mt-6 text-center text-sm text-zinc-500">
              Don't have an account?{" "}
              <button
                type="button"
                className="font-medium text-zinc-900 transition hover:underline"
              >
                Sign up
              </button>
            </p>

            {/* Terms */}
            <p className="mt-8 text-center text-[11px] leading-5 text-zinc-400">
              By continuing, you agree to NovaChat's Terms
              and Privacy Policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;