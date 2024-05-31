import React, { useContext, useState } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getAuthSession } from "@/lib/nextauth";
import "./globals.css";
import Navigation from "@/components/auth/Navigation";
import AuthProvider from "@/components/providers/AuthProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import { Compose } from "./combose";
import { UserProvider } from "@/components/providers/UserProvider"
import { ProjectProvider } from "@/components/providers/ProjectProvider"
import { ClientProvider } from "@/components/providers/ClientProvider"
import { ContractProvider } from "@/components/providers/ContractProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "勤怠管理システム",
  description: "勤怠管理システム（仮）",
};

interface RootLayoutProps {
  children: React.ReactNode
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  // 認証情報
  const user = await getAuthSession()

  return (
    <html lang="ja">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navigation user={user} />
            <ToastProvider/>

            <Compose components={[ UserProvider, ProjectProvider, ClientProvider, ContractProvider ]}>
              <main className="container mx-auto max-w-screen-2xl flex-1 px-2">
                {children}
              </main>
            </Compose>

            {/* フッター */}
            <footer className="py-5">
              <div className="text-center text-sm">
                Copyright © All rights reserved |{" "}
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  ktkhshi
                </a>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout