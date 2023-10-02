import './globals.scss';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Commenteer | Social Media Engagement',
  description: 'Create Social Meadia Engagement',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
