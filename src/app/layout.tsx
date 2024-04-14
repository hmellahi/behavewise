import { ThemeProvider } from "@/components/contexts/theme-provider";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "behaveWise - AI-Powered Mock Interviews",
  openGraph: {
    title: "behaveWise - AI-Powered Mock Interviews",
    description:
      "behaveWise is an AI-powered mock interview platform that helps you practice for your next job interview.",
    images: [
      {
        url: "https://behavewise.vercel.app/opengraph-image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "behaveWise - AI-Powered Mock Interviews",
    description:
      "behaveWise is an AI-powered mock interview platform that helps you practice for your next job interview.",
    images: ["https://behavewise.vercel.app/opengraph-image"],
    creator: "@Hmellahiii",
  },
  metadataBase: new URL("https://behavewise.vercel.app/opengraph-image"),
  description:
    "behaveWise is an AI-powered mock interview platform that helps you practice for your next job interview.",
};

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className={poppins.className}>{children}</div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
