import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth - LifeQuest',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
