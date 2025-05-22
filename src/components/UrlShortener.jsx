import React, { useState } from 'react'
import { Scissors } from 'lucide-react'
import toast from 'react-hot-toast'
import { shortenUrl } from '../util/urlUtility'

const UrlShortener = ({ onShorten }) => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    try {
      new URL(url)
    } catch (err) {
      setError('Please enter a valid URL (include http:// or https://)')
      return
    }

    setIsLoading(true)

    try {
      await shortenUrl(url)
      setUrl('')
      toast.success('URL shortened successfully!')
      if (onShorten) onShorten() // Trigger refresh
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to shorten URL')
      toast.error('Failed to shorten URL')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto mb-12 p-6 rounded-lg shadow-md transition-colors dark:bg-gray-900 bg-white">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Shorten Your URL</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Paste your long URL below and get a shareable, shortened link
          instantly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/url/to/shorten"
            className={`w-full px-4 py-3 rounded-lg border ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
            } focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white transition-colors`}
            disabled={isLoading}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
        >
          {isLoading ? (
            <span className="animate-pulse">Shortening...</span>
          ) : (
            <>
              <Scissors className="w-5 h-5" />
              <span>Shorten URL</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default UrlShortener
