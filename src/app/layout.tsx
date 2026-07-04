import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Umang Dakh — Cloud Ops Control Center",
    template: "%s | Umang Dakh",
  },
  description:
    "Cloud & DevOps Engineer | 3+ years AWS, Azure, Kubernetes, Terraform, CI/CD. Production infrastructure control center portfolio.",
  keywords: [
    "Cloud Engineer",
    "DevOps Engineer",
    "AWS",
    "Azure",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "Umang Dakh",
    "Site Reliability Engineer",
    "Infrastructure as Code",
  ],
  authors: [{ name: "Umang Dakh" }],
  creator: "Umang Dakh",
  metadataBase: new URL("https://umangdakh.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Umang Dakh — Cloud Ops Control Center",
    title: "Umang Dakh — Cloud Ops Control Center",
    description:
      "Cloud & DevOps Engineer | 3+ years AWS, Azure, Kubernetes, Terraform, CI/CD. Production infrastructure control center portfolio.",
    url: "https://umangdakh.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umang Dakh — Cloud Ops Control Center",
    description:
      "Cloud & DevOps Engineer | 3+ years AWS, Azure, Kubernetes, Terraform, CI/CD.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Umang Dakh",
              jobTitle: "Cloud & DevOps Engineer",
              url: "https://umangdakh.vercel.app",
              sameAs: [
                "https://linkedin.com/in/umang-dakh",
                "https://github.com/Denny-UD",
              ],
              knowsAbout: [
                "Amazon Web Services",
                "Microsoft Azure",
                "Kubernetes",
                "Terraform",
                "CI/CD",
                "Infrastructure as Code",
                "Cloud Architecture",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}