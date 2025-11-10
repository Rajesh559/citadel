import { ReactQueryClientProvider } from '@/app/components/query-provider';
import 'dms-common-ux/styles.css';
import '@/app/css/index.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://citadel.devicemanagement.motion.abb.com'),
  title: 'CITADEL',
  description: 'CITADEL azure board',
  openGraph: {
    title: 'CITADEL',
    description: 'CITADEL azure board',
    url: 'https://citadel.devicemanagement.motion.abb.com/',
    siteName: 'CITADEL',
    images: [
      {
        url: '/logo.svg',
        width: 120,
        height: 44,
        alt: 'CITADEL Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CITADEL',
    description: 'CITADEL azure board',
    site: '@citadel',
    creator: '@citadel',
    images: ['/logo.svg'],
  },
  alternates: {
    canonical: 'https://citadel.devicemanagement.motion.abb.com/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en" suppressHydrationWarning>
    <body suppressHydrationWarning>
      <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
    </body>
  </html>
);

export default RootLayout;
