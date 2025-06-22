import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '玲珑导航 - 精选AI工具导航',
  description: '发现最好的AI工具，提升您的工作效率。包含ChatGPT、Midjourney等热门AI工具。',
  keywords: 'AI工具, ChatGPT, Midjourney, AI导航, 人工智能',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen gradient-bg">
          {children}
        </div>
      </body>
    </html>
  )
} 