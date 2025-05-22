import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const RedirectHandler = () => {
  const { shortcode } = useParams()

  useEffect(() => {
    const redirectToOriginal = async () => {
      console.log('RedirectHandler triggered for shortcode:', shortcode)
      try {
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || 'http://localhost:3500'
        const response = await axios.get(
          `${backendUrl}/api/redirect/${shortcode}`
        )

        const { originalUrl } = response.data
        window.location.href = originalUrl // browser redirect
      } catch (err) {
        console.error('Redirect failed:', err)
        toast.error('Failed to redirect. Invalid short URL.')
      }
    }

    redirectToOriginal()
  }, [shortcode])

  return (
    <div className="flex items-center justify-center min-h-screen text-gray-700 dark:text-gray-200">
      <p>Redirecting...</p>
    </div>
  )
}

export default RedirectHandler
