import './globals.css'

export const metadata = {
  title: 'Task Manager - Omar Hashmi',
  description: 'A simple and elegant task management application',
  author: 'Omar Hashmi'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          {children}
        </div>
      </body>
    </html>
  )
}