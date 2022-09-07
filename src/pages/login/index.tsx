import { useMutation } from "react-query"
import { useForm } from "react-hook-form"
import { auth, setToken } from '../../api/'
import type { CredentialType } from '../../types/'
import { useNavigate } from "react-router-dom"
import Spinner from "../../components/Spinner"

export default function Login() {
  const { register, handleSubmit } = useForm<CredentialType>()
  const navigate = useNavigate()

  const mutation = useMutation(auth, {
    onSuccess: (data) => {
      if (data.token) {
        setToken(data.token)
        navigate('/builder')
      } else {
        console.log(data)
      }
    }
  })
  const { mutate, isLoading, isError } = mutation
  const error = mutation.error as string

  const onSubmit = handleSubmit((data) => mutate(data))

  return (
    <div className="layout-container bg-gray-50">
      <div className="mx-auto">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to build your hamburger ❤️</h2>
      </div>
      <div className="mx-auto mt-8 w-auto sm:w-96">
        <div className="bg-white py-8 px-10 shadow rounded-lg">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-tasty focus:outline-none focus:ring-tasty"
                  {...register("name", { required: true })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-tasty focus:outline-none focus:ring-tasty"
                  {...register("password", { required: true })}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-tasty py-2 px-4 text-sm font-medium text-white shadow-sm"
              >
                {isLoading && <Spinner />}
                <span className="ml-2">Sign in</span>
              </button>
              {isError && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
