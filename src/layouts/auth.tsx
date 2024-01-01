import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <main className="app__auth">
      {/* position fixed header here? */}

      {children}
    </main>
  );
}
