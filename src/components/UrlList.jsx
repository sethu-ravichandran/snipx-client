import React, { useEffect, useState } from 'react'
import { Clock, Copy, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import { getUrls } from '../util/urlUtility'

const UrlList = () => {
  const [urls, setUrls] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshToggle, setRefreshToggle] = useState(false)

  const fetchUrls = async () => {
    try {
      const data = await getUrls()
      setUrls(data)
    } catch (error) {
      console.error('Failed to fetch URLs:', error)
      toast.error('Failed to load URLs')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUrls()
    const interval = setInterval(fetchUrls, 30000)
    return () => clearInterval(interval)
  }, [refreshToggle])

  const copyToClipboard = (shortUrl) => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => toast.success('URL copied to clipboard!'))
      .catch(() => toast.error('Failed to copy URL'))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date)
  }

  const handleShortUrlClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    setRefreshToggle((prev) => !prev)
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 dark:bg-gray-800 rounded"
            ></div>
          ))}
        </div>
      </div>
    )
  }

  if (urls.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-10">
        <h3 className="text-xl font-medium mb-2">No URLs shortened yet</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Your shortened URLs will appear here after you create them.
        </p>
      </div>
    )
  }

  const apiUrl = import.meta.env.VITE_BACKEND_URL || window.location.origin

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Your Shortened URLs</h3>

      <div className="space-y-4">
        {urls.map((url) => {
          const shortUrl = `${apiUrl}/${url.shortCode}`

          return (
            <div
              key={url.shortCode}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md dark:bg-gray-900 bg-white"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="overflow-hidden">
                  <h4 className="font-medium text-sm truncate max-w-[250px] sm:max-w-xs">
                    {url.originalUrl}
                  </h4>

                  <div className="flex items-center mt-2">
                    <span
                      onClick={() => handleShortUrlClick(shortUrl)}
                      className="cursor-pointer text-purple-600 dark:text-purple-400 font-medium hover:underline flex items-center"
                    >
                      {shortUrl.replace(/^https?:\/\//, '')}
                      <ExternalLink className="w-4 h-4 ml-1 inline" />
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDate(url.createdAt)}
                  </span>

                  <button
                    onClick={() => copyToClipboard(shortUrl)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Copy URL"
                    title="Copy URL"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-2 flex items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                  {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UrlList
