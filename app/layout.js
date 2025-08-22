import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

import { Josefin_Sans } from "next/font/google"

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap"
})

console.log(josefin);
import "@app/_styles/globals.css"
export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
    description: "Luxurious cabin hotel, located in the heart of the Italian DOlomites, surrounded by beautiful moutains and dark forests",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className}  bg-colors-primary-950 text-colors-primary-100 min-h-screen`} >
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children} </main>
        <footer> Copyright by The Wild Oasis </footer>
      </body>
    </html >
  );
}
