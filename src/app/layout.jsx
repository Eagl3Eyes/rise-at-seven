import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const metadata = {
  title: 'Rise at Seven | Search-First Creative Agency',
  description: 'Search-first creative agency that drives demand, captures attention, and delivers growth.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}
