import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Learn Sindhi Language - Consonants',
  description: 'Interactive app to learn Sindhi consonants.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="sd" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* We will load the user's CSS from public folder once uploaded */}
        <link rel="stylesheet" href="/stage-experience.css" />
      </head>
      <body suppressHydrationWarning className="stage-app-body">
        {children}
      </body>
    </html>
  );
}
