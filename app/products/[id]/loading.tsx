export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F5F1E8]">
      <section className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="animate-pulse rounded-3xl border border-[#E5DFD3] bg-white/70 p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="aspect-square w-full rounded-2xl bg-[#EDE7DD] md:w-1/2" />

              <div className="flex-1 space-y-4">
                <div className="h-8 w-3/4 rounded bg-[#EDE7DD]" />
                <div className="h-6 w-1/4 rounded bg-[#EDE7DD]" />
                <div className="h-4 w-full rounded bg-[#EDE7DD]" />
                <div className="h-4 w-5/6 rounded bg-[#EDE7DD]" />
                <div className="h-10 w-40 rounded-xl bg-[#EDE7DD]" />
              </div>
            </div>
          </div>

          <div className="animate-pulse rounded-3xl border border-[#E5DFD3] bg-white/60 p-6 shadow-sm md:p-8">
            <div className="mb-8 space-y-3">
              <div className="h-3 w-24 rounded bg-[#EDE7DD]" />
              <div className="h-8 w-40 rounded bg-[#EDE7DD]" />
              <div className="h-4 w-72 rounded bg-[#EDE7DD]" />
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-[#F8F4ED] p-5">
                <div className="h-4 w-32 rounded bg-[#EDE7DD]" />
                <div className="mt-3 h-4 w-full rounded bg-[#EDE7DD]" />
                <div className="mt-2 h-4 w-5/6 rounded bg-[#EDE7DD]" />
              </div>

              <div className="rounded-2xl bg-[#F8F4ED] p-5">
                <div className="h-4 w-28 rounded bg-[#EDE7DD]" />
                <div className="mt-3 h-4 w-full rounded bg-[#EDE7DD]" />
                <div className="mt-2 h-4 w-2/3 rounded bg-[#EDE7DD]" />
              </div>

              <div className="border-t border-[#E5DFD3] pt-8">
                <div className="h-10 w-full rounded-xl bg-[#EDE7DD]" />
                <div className="mt-3 h-28 w-full rounded-xl bg-[#EDE7DD]" />
                <div className="mt-4 h-10 w-36 rounded-xl bg-[#EDE7DD]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}