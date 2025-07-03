import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <SidebarInset className="bg-gradient-to-bl from-slate-900 via-cyan-900/20 to-slate-900">
              <main className="lg:mx-20 md:mx-10 mx-2">
                <Navbar/>
                <div className='mt-40 mb-15'>
                  {children}
                  <Toaster position="top-center" richColors/>
                </div>
              </main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
      <footer className="bg-gradient-to-br from-slate-900/80 to bg-cyan-800/30 border-t border-slate-700/50">
        <Footer/>
      </footer>
    </html>
  );
}
