'use client';

import { persistor, store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import './globals.css';

import { HeroUIProvider } from "@heroui/react";
import {ToastProvider} from "@heroui/toast";
import React from "react";
import { queryClient } from "@/utils/queryClient";

const RootLayout = ({ 
  children 
}: Readonly<{children: React.ReactNode}>) => {
  return (
    <html className="bg-backgroundColor" lang="en">
      <body
        className={clsx(
          'bg-backgroundColor',
          'antialiased'
        )}
      >
        <HeroUIProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                <ToastProvider />
                {children}
              </QueryClientProvider>
            </PersistGate>
          </Provider>
        </HeroUIProvider>
      </body>
    </html>
  );
}

export default RootLayout;