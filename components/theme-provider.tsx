"use client"

import * as React from "react"
import { type Attribute, ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute: Attribute | Attribute[] | undefined;
  defaultTheme: "light" | "dark"
  enableSystem: boolean
  disableTransitionOnChange: boolean
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}