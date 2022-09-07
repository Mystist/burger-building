import { Link } from "react-router-dom"
import { useAuth } from "../../hooks"

export default function Home() {
  const hasAuthorized = useAuth()

  return (
    <>
    <div className="layout-container bg-gray-50">
      <div className="mx-auto">
        <h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">Burger Building</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">Build your hamburger 🍔 with ❤️</p>

        <nav className="mt-8">
          <Link className="flex w-full justify-center rounded-md border border-transparent bg-tasty py-2 px-4 text-lg font-medium text-white shadow-sm" to={hasAuthorized ? '/builder' : '/login'}>{hasAuthorized ? 'Start Build' : 'Sign in'}</Link>
        </nav>
      </div>
    </div>
    </>
  )
}
