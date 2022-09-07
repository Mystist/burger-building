import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/home'
import Login from './pages/login'
import Builder from './pages/builder'
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
