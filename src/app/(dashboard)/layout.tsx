import { SidebarLayout } from "@/app/(dashboard)/SidebarLayout";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout className={poppins.className}>{children}</SidebarLayout>;
}
