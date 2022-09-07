import { useEffect, useState } from "react"
import { isTokenValid } from "../api"
import type { AuthOptionType } from "../types"

export const useAuth = (options?: AuthOptionType) => {
  const [hasAuthorized, setHasAuthorized] = useState(false)
  const { isRedirect } = options || {}

  useEffect(() => {
    if (isTokenValid()) {
      setHasAuthorized(true)
    } else if (isRedirect) {
      window.location.href = '/'
    }
  }, [isRedirect])

  return hasAuthorized
}
