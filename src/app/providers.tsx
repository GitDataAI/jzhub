import { ThemeProvider } from "../theme/ThemeProvider.tsx";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>{children}</ThemeProvider>
  );
}
