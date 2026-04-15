export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F5F1E8]">
      <section className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
            {/* desktop filters skeleton */}
            <aside className="hidden md:block">
              <div className="sticky top-28 rounded-3xl border border-[#E5DFD3] bg-white/70 p-5 shadow-sm animate-pulse">
                <div className="mb-6 h-4 w-20 rounded bg-[#EDE7DD]" />
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="h-3 w-16 rounded bg-[#EDE7DD]" />
                    <div className="h-10 w-full rounded-lg bg-[#EDE7DD]" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 w-20 rounded bg-[#EDE7DD]" />
                    <div className="h-10 w-full rounded-lg bg-[#EDE7DD]" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 w-12 rounded bg-[#EDE7DD]" />
                    <div className="flex gap-2">
                      <div className="h-10 w-1/2 rounded-lg bg-[#EDE7DD]" />
                      <div className="h-10 w-1/2 rounded-lg bg-[#EDE7DD]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 w-14 rounded bg-[#EDE7DD]" />
                    <div className="h-10 w-full rounded-lg bg-[#EDE7DD]" />
                  </div>
                </div>
              </div>
            </aside>

            {/* main content skeleton */}
            <div>
              <div className="mb-6 rounded-3xl border border-[#E5DFD3] bg-white/60 p-6 shadow-sm animate-pulse">
                <div className="h-3 w-24 rounded bg-[#EDE7DD]" />
                <div className="mt-3 h-8 w-40 rounded bg-[#EDE7DD]" />
                <div className="mt-3 h-4 w-72 rounded bg-[#EDE7DD]" />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex min-h-[460px] flex-col overflow-hidden rounded-2xl border border-[#E5DFD3] bg-white/90 animate-pulse"
                  >
                    <div className="h-48 w-full bg-[#EDE7DD] md:h-56" />

                    <div className="flex flex-1 flex-col p-5">
                      <div className="h-5 w-3/4 rounded bg-[#EDE7DD]" />
                      <div className="mt-3 h-4 w-full rounded bg-[#EDE7DD]" />
                      <div className="mt-2 h-4 w-2/3 rounded bg-[#EDE7DD]" />
                      <div className="mt-4 h-5 w-1/3 rounded bg-[#EDE7DD]" />
                      <div className="mt-3 h-3 w-1/2 rounded bg-[#EDE7DD]" />
                      <div className="mt-2 h-3 w-1/3 rounded bg-[#EDE7DD]" />

                      <div className="mt-auto pt-5">
                        <div className="h-10 w-full rounded-xl bg-[#EDE7DD]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}