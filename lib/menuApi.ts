import type { Menu, MenuItem, MenuResult, MenuSection } from "@/types/menu";

const MENU_PATH = "/api/v1/menus/rosies";

const fallbackMenu: Menu = {
  name: "Lilac",
  description: "A warm, seasonal menu preview while the live endpoint is unavailable.",
  sections: [
    {
      id: "starters",
      name: "Starters",
      items: [
        {
          id: "marinated-olives",
          name: "Marinated Olives",
          description: "Citrus, rosemary, chile flake.",
          price: 8,
        },
        {
          id: "house-focaccia",
          name: "House Focaccia",
          description: "Whipped ricotta, tomato oil.",
          price: 11,
        },
      ],
    },
    {
      id: "mains",
      name: "Mains",
      items: [
        {
          id: "rigatoni-rosa",
          name: "Rigatoni Rosa",
          description: "San Marzano tomato, basil, pecorino.",
          price: 23,
        },
        {
          id: "roasted-chicken",
          name: "Roasted Chicken",
          description: "Crispy potatoes, salsa verde, bitter greens.",
          price: 29,
        },
      ],
    },
    {
      id: "dessert",
      name: "Dessert",
      items: [
        {
          id: "olive-oil-cake",
          name: "Olive Oil Cake",
          description: "Lemon cream, toasted pistachio.",
          price: 10,
        },
      ],
    },
  ],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function toStringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function toPrice(value: unknown): string | number | undefined {
  if (isRecord(value)) {
    const formatted = toStringValue(value.formatted);
    if (formatted) return formatted;

    if (typeof value.amount_cents === "number") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: toStringValue(value.currency) ?? "USD",
      }).format(value.amount_cents / 100);
    }
  }

  if (typeof value === "number" || typeof value === "string") {
    return value;
  }

  return undefined;
}

function slugify(value: string, fallback: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return slug || fallback;
}

function extractArray(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (Array.isArray(record[key])) {
      return record[key];
    }
  }

  return [];
}

function normalizeItem(value: unknown, index: number): MenuItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const name =
    toStringValue(value.name) ||
    toStringValue(value.title) ||
    toStringValue(value.label);

  if (!name) {
    return null;
  }

  return {
    id:
      toStringValue(value.id) ||
      toStringValue(value.slug) ||
      slugify(name, `item-${index + 1}`),
    name,
    description:
      toStringValue(value.description) ||
      toStringValue(value.details) ||
      toStringValue(value.body),
    price:
      toPrice(value.price) ??
      toPrice(value.price_in_dollars) ??
      toPrice(value.display_price),
    variations: extractArray(value, ["variations"])
      .map(normalizeItem)
      .filter((item): item is MenuItem => Boolean(item)),
  };
}

function normalizeSection(value: unknown, index: number): MenuSection | null {
  if (!isRecord(value)) {
    return null;
  }

  const name =
    toStringValue(value.name) ||
    toStringValue(value.title) ||
    toStringValue(value.label) ||
    `Section ${index + 1}`;

  const items = extractArray(value, ["items", "menu_items", "products"])
    .map(normalizeItem)
    .filter((item): item is MenuItem => Boolean(item));

  return {
    id:
      toStringValue(value.id) ||
      toStringValue(value.slug) ||
      slugify(name, `section-${index + 1}`),
    name,
    description: toStringValue(value.description),
    items,
  };
}

function unwrapMenuPayload(payload: unknown) {
  if (!isRecord(payload)) {
    return payload;
  }

  return payload.menu || payload.data || payload;
}

function normalizeMenu(payload: unknown): Menu {
  const menuPayload = unwrapMenuPayload(payload);

  if (!isRecord(menuPayload)) {
    throw new Error("Invalid menu response");
  }

  const name =
    toStringValue(menuPayload.name) ||
    toStringValue(menuPayload.title) ||
    fallbackMenu.name;

  const sectionValues = extractArray(menuPayload, [
    "sections",
    "categories",
    "groups",
    "menu_sections",
  ]);

  const sections = sectionValues
    .map(normalizeSection)
    .filter((section): section is MenuSection => Boolean(section));

  return {
    name,
    description: toStringValue(menuPayload.description),
    sections,
  };
}

export async function getMenu(): Promise<MenuResult> {
  const baseUrl = process.env.MENU_API_BASE_URL;

  if (!baseUrl) {
    return {
      menu: fallbackMenu,
      source: "fallback",
    };
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}${MENU_PATH}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      next: {
        revalidate: 300,
      },
    });

    if (!response.ok) {
      throw new Error(`Menu API returned ${response.status}`);
    }

    return {
      menu: normalizeMenu(await response.json()),
      source: "api",
    };
  } catch {
    return {
      menu: fallbackMenu,
      source: "fallback",
    };
  }
}
