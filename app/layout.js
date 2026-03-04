import './globals.css';
import Navbar from "../components/Navbar";

export const metadata = {
  title: 'Proyecto Final',
  description: 'Frontend',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p>© 2026 R.R.A.M.</p>
        </footer>
      </body>
    </html>
  );
}