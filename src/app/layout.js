import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import ReduxProvider from "@/store/ReduxProvider"; // Providerni import qiling
import './globals.css';

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider> {/* Redux shu yerda hamma sahifani o'raydi */}
          <Nav/>
          <main>{children}</main>
          <Footer/>
        </ReduxProvider>
      </body>
    </html>
  )
}