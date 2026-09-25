import { MenuPage } from "@/components/MenuPage";
import { getMenu } from "@/lib/menuApi";

export const revalidate = 300;

export default async function Home() {
  const menuResult = await getMenu();

  return <MenuPage menuResult={menuResult} />;
}
