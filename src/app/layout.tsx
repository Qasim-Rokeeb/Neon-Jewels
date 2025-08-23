import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Righteous, Tektur } from "next/font/google";

export const metadata: Metadata = {
  title: 'WordGlow',
  description: 'Weave words of light in this futuristic word game.',
};

const fontHeadline = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-headline",
});

const fontBody = Tektur({
  subsets: ["latin"],
  variable: "--font-body",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("font-body antialiased", fontBody.variable, fontHeadline.variable, "min-h-screen bg-background")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
