
import { NeonJewelsLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
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
            <h1 className="font-headline text-4xl text-primary mb-4" style={{textShadow: '0 0 10px hsl(var(--primary))'}}>Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-6 prose prose-invert max-w-none text-foreground/90">
              <p>
                Your privacy is important to us. It is Neon Jewels' policy to respect your privacy regarding any information we may collect from you across our application.
              </p>

              <h2 className="font-headline text-2xl text-accent pt-4">1. Information We Collect</h2>
              <p>
                We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
              </p>
              <p>
                We may collect information such as game data, scores, and user-provided feedback to improve our services and the user experience. We do not collect personally identifiable information unless it is voluntarily provided.
              </p>
              

              <h2 className="font-headline text-2xl text-accent pt-4">2. How We Use Your Information</h2>
              <p>
                We use the information we collect in various ways, including to:
              </p>
               <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our application</li>
                <li>Improve, personalize, and expand our application</li>
                <li>Understand and analyze how you use our application</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, for customer service, to provide you with updates and other information relating to the application, and for marketing and promotional purposes</li>
                <li>Find and prevent fraud</li>
              </ul>

              <h2 className="font-headline text-2xl text-accent pt-4">3. Security</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
              </p>

              <h2 className="font-headline text-2xl text-accent pt-4">4. Links to Other Sites</h2>
              <p>
                Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
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
