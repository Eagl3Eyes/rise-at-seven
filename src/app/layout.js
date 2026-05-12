import './globals.css';
import ClientWrapper from '../components/shared/ClientWrapper';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const metadata = {
  title: 'Rise at Seven',
  description: 'Search-first creative agency',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/711261502f.js" crossOrigin="anonymous" defer></script>
      </head>
      <body>
        <ClientWrapper>
          <div className="bg-grey-100">
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </ClientWrapper>
      </body>
    </html>
  );
}
