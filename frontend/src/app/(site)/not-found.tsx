import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-slate-400 mb-8">Could not find requested resource</p>
      <Link 
        href="/"
        className="px-6 py-3 rounded-full bg-primary hover:bg-primary/90 transition-colors font-medium"
      >
        Return Home
      </Link>
    </div>
  )
}
