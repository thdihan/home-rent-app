import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/lib/AuthContext';
import { LanguageProvider } from '@/lib/LanguageContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BashaLagbe - Elite Property Solutions',
  description: 'Find elite rental opportunities in prime locations across Bangladesh.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body
        className={`${inter.variable} min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col`}
      >
        <AuthProvider>
          <LanguageProvider>
            <Toaster position="bottom-right" richColors closeButton />
            <Navbar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
