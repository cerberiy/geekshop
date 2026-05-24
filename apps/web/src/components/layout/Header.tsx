import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-black tracking-tight text-white">
          Geek<span className="text-violet-400">Shop</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="text-zinc-300 transition hover:text-white">
            Products
          </Link>
        </div>
      </nav>
    </header>
  )
}
