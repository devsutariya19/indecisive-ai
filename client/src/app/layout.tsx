import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { BrainCircuit } from "lucide-react";

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
            {/* <AppSidebar /> */}
            <SidebarInset>
              <main className="lg:mx-20 md:mx-10">
                <div className="flex flex-row justify-between px-5 my-2 sticky z-50 top-0 bg-background">
                  {/* <SidebarTrigger/> */}
                  {/* <DarkModeToggle/> */}
                  <a href="/">
                    <div className='flex flex-row items-center gap-4 my-3'>
                      <div className='w-14 h-14 bg-gradient-to-br from-emerald-600 dark:from-emerald-500 to-blue-700 rounded-xl flex flex-row items-center justify-center'>
                        <BrainCircuit className='w-8 h-8 text-white'/>
                      </div>
                      <div className='text-2xl font-bold mb-1'>Indecisive AI</div>
                    </div>
                  </a>
                </div>
                <div className='mt-5 mb-20'>
                  {children}
                </div>
              </main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
