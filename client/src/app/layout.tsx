import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";

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
              <main className="lg:mx-20 md:mx-10 mx-5">
                <Navbar/>
                <div className='mt-40 mb-20'>
                  {children}
                  <Toaster position="top-center" richColors/>
                </div>
              </main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
