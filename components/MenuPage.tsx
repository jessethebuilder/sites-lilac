import { MenuItemRow } from "@/components/MenuItemRow";
import type { MenuResult } from "@/types/menu";

export function MenuPage({ menuResult }: { menuResult: MenuResult }) {
  const { menu, source } = menuResult;

  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-ink/10 bg-[#f5effa]">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=2200&auto=format&fit=crop')",
            filter: "saturate(1.8) brightness(0.78) contrast(1.08)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_left,_rgba(168,120,219,0.42),_transparent_36%),linear-gradient(90deg,_rgba(251,247,255,0.96),_rgba(242,229,250,0.82),_rgba(240,231,247,0.88))]" />

        <div className="mx-auto grid min-h-[58vh] max-w-6xl content-end px-5 pb-12 pt-24 sm:px-8 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-tomato">
            Fresh today
          </p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-none text-ink sm:text-7xl">
            Lilac
          </h1>
          {menu.description ? (
            <p className="mt-6 max-w-xl text-base leading-7 text-ink/72 sm:text-lg">
              {menu.description}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
        {source === "fallback" ? (
          <div className="mb-8 border-l-4 border-tomato bg-linen px-5 py-4 text-sm leading-6 text-ink/75 shadow-soft">
            The live menu API is unavailable, so this preview is using local sample data.
          </div>
        ) : null}

        <nav className="sticky top-0 z-10 -mx-5 mb-8 flex gap-2 overflow-x-auto border-y border-ink/10 bg-paper/92 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
          {menu.sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="whitespace-nowrap rounded-full border border-ink/12 bg-linen px-4 py-2 text-sm font-medium text-ink transition hover:border-tomato hover:text-tomato"
            >
              {section.name}
            </a>
          ))}
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-12">
            {menu.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
              >
                <div className="mb-2 flex items-end justify-between gap-5 border-b-2 border-ink pb-3">
                  <h2 className="font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                    {section.name}
                  </h2>
                  {section.items.length ? (
                    <p className="text-sm font-medium text-ink/55">
                      {section.items.length} items
                    </p>
                  ) : null}
                </div>

                {section.description ? (
                  <p className="mb-3 max-w-2xl text-sm leading-6 text-ink/66">
                    {section.description}
                  </p>
                ) : null}

                <div>
                  {section.items.map((item) => (
                    <MenuItemRow key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="h-fit border border-ink/10 bg-linen p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-basil">
              Lilac
            </p>
            <p className="mt-3 text-sm leading-6 text-ink/70">
              Menu data is fetched server-side from the configured API base URL.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
