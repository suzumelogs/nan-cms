import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tập',
}

export default function Page({ children }: { children: React.ReactNode }) {
  return children
}
