import { Inter } from 'next/font/google'
import './globals.css'
import NextUiProvider, { AuthProvider } from './providers';
import Header from '@/components/header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from '@/redux/ReduxProvider';
import ProtectedRoute from './RouteProtection';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}
        <ReduxProvider>
          <NextUiProvider>
            <ToastContainer />
            <ProtectedRoute>
              <Header />
              {children}
              <Footer />
            </ProtectedRoute>
          </NextUiProvider>
        </ReduxProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}
