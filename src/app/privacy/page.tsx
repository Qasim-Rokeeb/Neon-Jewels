
import { WordGlowLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, ShieldCheck, Info, FileText } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <>
      <div className="fixed inset-0 -z-10 nebula-bg" />
      <div className="relative flex flex-col min-h-screen items-center p-4 sm:p-6 md:p-8 font-body text-foreground overflow-hidden">
        <header className="w-full max-w-4xl p-4 flex justify-between items-center bg-transparent">
          <Link href="/" className="flex items-center gap-3">
            <WordGlowLogo className="w-10 h-10" />
            <h1 className="text-2xl font-headline tracking-widest uppercase">WordGlow</h1>
          </Link>
        </header>

        <main className="flex-1 w-full max-w-4xl py-12">
          <div className="bg-card/50 backdrop-blur-md rounded-xl border border-border shadow-2xl shadow-primary/10 p-6 md:p-10">
            <h1 className="font-headline text-4xl text-primary mb-4 flex items-center gap-3" style={{textShadow: '0 0 10px hsl(var(--primary))'}}>
              <ShieldCheck className="w-10 h-10" />
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="space-y-8 prose prose-invert max-w-none text-foreground/90">
              <p>
                Your privacy is important to us. It is WordGlow's policy to respect your privacy regarding any information we may collect from you across our application. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
              </p>

              <section>
                <h2 className="font-headline text-2xl text-accent flex items-center gap-2 pt-4">
                  <Info className="w-6 h-6" /> What Information We Collect
                </h2>
                <div className="space-y-4 pl-8">
                   <p>
                    In Short: We collect personal information that you provide to us.
                  </p>
                  <p>
                    We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the application or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the application, the choices you make and the products and features you use.
                  </p>
                   <p>
                    <strong>Game Data:</strong> We automatically collect gameplay information such as your scores, word placements, and game progress. This data is essential for the core functionality of the game and for features like "Play of the Game". This data is anonymized and not linked to any personally identifiable information.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-headline text-2xl text-accent flex items-center gap-2 pt-4">
                  <FileText className="w-6 h-6" /> How We Use Your Information
                </h2>
                 <div className="space-y-4 pl-8">
                  <p>
                    In Short: We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.
                  </p>
                  <p>
                    We use the information we collect or receive:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>To facilitate account creation and logon process.</strong> If you choose to link your account with us to a third-party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process.</li>
                    <li><strong>To post testimonials.</strong> We post testimonials on our application that may contain personal information.</li>
                    <li><strong>To provide and maintain our Service.</strong> Including to monitor the usage of our Service.</li>
                    <li><strong>To manage Your Account.</strong> To manage your registration as a user of the Service. The Personal Data you provide can give you access to different functionalities of the Service that are available to you as a registered user.</li>
                    <li><strong>To improve user experience.</strong> We analyze game data to understand player behavior, identify bugs, and improve the overall game balance and design.</li>
                    <li><strong>For the "Play of the Game" feature.</strong> Game data is sent to our AI service to determine the most impressive move of the game. This analysis is automated and does not involve human review of your specific game.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="font-headline text-2xl text-accent pt-4">3. Will Your Information Be Shared With Anyone?</h2>
                <div className="space-y-4 pl-8">
                    <p>In Short: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
                    <p>We do not share your personal information with third parties except as described in this privacy policy. We may share your information with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work.</p>
                </div>
              </section>

              <section>
                 <h2 className="font-headline text-2xl text-accent pt-4">4. How Long Do We Keep Your Information?</h2>
                 <div className="space-y-4 pl-8">
                    <p>In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law.</p>
                    <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).</p>
                 </div>
              </section>

              <section>
                 <h2 className="font-headline text-2xl text-accent pt-4">5. How Do We Keep Your Information Safe?</h2>
                 <div className="space-y-4 pl-8">
                    <p>In Short: We aim to protect your personal information through a system of organizational and technical security measures.</p>
                    <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information.</p>
                 </div>
              </section>
            </div>
          </div>
        </main>

        <footer className="w-full max-w-4xl text-center text-muted-foreground text-sm">
            <Separator className="my-4 bg-border/20" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
              <p>&copy; {new Date().getFullYear()} WordGlow. All Rights Reserved.</p>
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
