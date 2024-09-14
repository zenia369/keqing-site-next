import { ReactNode, Suspense } from "react";

export default function RootLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <>
      {children}
      <Suspense>{modal}</Suspense>
    </>
  );
}
