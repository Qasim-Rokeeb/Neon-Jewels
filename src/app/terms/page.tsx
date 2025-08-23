
import { NeonJewelsLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      <div className="fixed inset-0 -z-10 nebula-bg" />
      <div className="relative flex flex-col min-h-screen items-center p-4 sm:p-6 md:p-8 font-body text-foreground overflow-hidden">
        <header className="w-full max-w-4xl p-4 flex justify-between items-center bg-transparent">
          <Link href="/" className="flex items-center gap-3">
            <NeonJewelsLogo className="w-10 h-10" />
            <h1 className="text-2xl font-headline tracking-widest uppercase">Neon Jewels</h1>
          </Link>
        </header>

        <main className="flex-1 w-full max-w-4xl py-12">
          <div className="bg-card/50 backdrop-blur-md rounded-xl border border-border shadow-2xl shadow-primary/10 p-6 md:p-10">
            <h1 className="font-headline text-4xl text-primary mb-4" style={{textShadow: '0 0 10px hsl(var(--primary))'}}>Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-6 prose prose-invert max-w-none text-foreground/90">
              <p>
                Welcome to Neon Jewels! These terms and conditions outline the rules and regulations for the use of our application. By accessing this app, we assume you accept these terms and conditions. Do not continue to use Neon Jewels if you do not agree to all of the terms and conditions stated on this page.
              </p>

              <h2 className="font-headline text-2xl text-accent pt-4">1. License to Use</h2>
              <p>
                Unless otherwise stated, Neon Jewels and/or its licensors own the intellectual property rights for all material on Neon Jewels. All intellectual property rights are reserved. You may access this from Neon Jewels for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <p>You must not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Republish material from Neon Jewels</li>
                <li>Sell, rent or sub-license material from Neon Jewels</li>
                <li>Reproduce, duplicate or copy material from Neon Jewels</li>
                <li>Redistribute content from Neon Jewels</li>
              </ul>

              <h2 className="font-headline text-2xl text-accent pt-4">2. User Content</h2>
              <p>
                In these terms and conditions, “your user content” means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to this app, for whatever purpose. You grant to Neon Jewels a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your user content in any existing or future media.
              </p>

              <h2 className="font-headline text-2xl text-accent pt-4">3. Limitation of Liability</h2>
              <p>
                In no event shall Neon Jewels, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this app whether such liability is under contract. Neon Jewels, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this app.
              </p>

              <h2 className="font-headline text-2xl text-accent pt-4">4. Governing Law & Jurisdiction</h2>
              <p>
                These terms will be governed by and interpreted in accordance with the laws of the jurisdiction in which the company is based, and you submit to the non-exclusive jurisdiction of the state and federal courts located in that jurisdiction for the resolution of any disputes.
              </p>
            </div>
          </div>
        </main>

        <footer className="w-full max-w-4xl text-center text-muted-foreground text-sm">
            <Separator className="my-4 bg-border/20" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
              <p>&copy; {new Date().getFullYear()} Neon Jewels. All Rights Reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Github className="w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>
        </footer>
      </div>
    </>
  );
}
