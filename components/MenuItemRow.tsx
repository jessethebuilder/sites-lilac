import type { MenuItem } from "@/types/menu";

function formatPrice(price?: string | number | null) {
  if (price === null || price === undefined || price === "") {
    return null;
  }

  if (typeof price === "number") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }

  return price;
}

export function MenuItemRow({ item }: { item: MenuItem }) {
  const price = formatPrice(item.price);
  const hasSizes = (item.variations?.length ?? 0) > 1;

  return (
    <article className="grid grid-cols-[1fr_auto] gap-x-5 gap-y-1 border-b border-ink/10 py-5 last:border-b-0">
      <h3 className="text-base font-semibold leading-snug text-ink sm:text-lg">
        {item.name}
      </h3>
      {price && !hasSizes ? (
        <p className="pt-0.5 text-sm font-semibold tabular-nums text-tomato sm:text-base">
          {price}
        </p>
      ) : null}
      {item.description ? (
        <p className="col-span-2 max-w-2xl text-sm leading-6 text-ink/70">
          {item.description}
        </p>
      ) : null}
      {hasSizes ? (
        <ul className="col-span-2 mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink/75">
          {item.variations?.map((variation) => (
            <li key={variation.id}>
              {variation.name}
              {formatPrice(variation.price) !== null ? (
                <span className="ml-2 font-semibold tabular-nums text-tomato">
                  {formatPrice(variation.price)}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
