export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price?: string | number;
  variations?: MenuItem[];
};

export type MenuSection = {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
};

export type Menu = {
  name: string;
  description?: string;
  sections: MenuSection[];
};

export type MenuResult = {
  menu: Menu;
  source: "api" | "fallback";
};
