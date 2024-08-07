import { Inter } from 'next/font/google';
import { AuthProvider } from "@/lib/authContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "Attendee",
  description: "to receive data of staffs that came in to work with there time of depature from work",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
      </html>
    </AuthProvider>
  
  );
}
