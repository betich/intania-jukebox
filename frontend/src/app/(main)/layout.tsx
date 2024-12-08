import { Header } from "@/components/common/header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-neutral-50">
      <Header />
      {children}
    </main>
  );
}
