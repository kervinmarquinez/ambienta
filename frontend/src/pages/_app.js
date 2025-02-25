import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Kanit, Poppins } from "next/font/google";

// Crear las instancias de las fuentes, especificando los pesos que vamos a usar
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"], // Agregar pesos de la fuente Kanit
  variable: "--font-kanit",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"], // Agregar pesos de la fuente Poppins
  variable: "--font-poppins",
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${kanit.variable} ${poppins.variable}`}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
