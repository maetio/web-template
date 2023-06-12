import { MuiProvider } from 'app/providers/mui';
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthContextProvider } from 'app/providers/auth-context';
import {
  RecoilRoot,
} from 'recoil';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Maet Web Template',
  description: 'NextJS, Typescript, MUI, Firebase starter',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          <AuthContextProvider>
            <MuiProvider>
              {children}
            </MuiProvider>
          </AuthContextProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
