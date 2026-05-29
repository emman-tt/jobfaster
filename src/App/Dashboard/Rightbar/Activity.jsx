import {
  Ban,
  BriefcaseBusiness,
  FilePenLineIcon,
  FileText,
  FolderOpen,
  Mail,
  Loader,
} from 'lucide-react'
import { TableOfContents } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
export default function Activity ({ data, total, hasMore, onLoadMore }) {
  const { appearance } = useSelector(state => state.preferences)
  const [loadingMore, setLoadingMore] = useState(false)

  function formatDate (item) {
    if (!item) {
      return ''
    }
    const formatted = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date(item))

    return formatted
  }

  function findIcon (item) {
    switch (item) {
      case 'folder':
        return <FolderOpen className='w-4 h-4' />

      case 'file':
        return <FileText className='w-4 h-4' />

      case 'job':
        return <BriefcaseBusiness className='w-4 h-4' />

      case 'mail':
        return <Mail className='w-4 h-4' />

      default:
        return <Ban />
    }
  }

  async function handleLoadMore () {
    setLoadingMore(true)
    try {
      await onLoadMore()
    } finally {
      setLoadingMore(false)
    }
  }

  const items = Array.isArray(data) ? [...data].reverse() : []

  return (
    <section className='w-full h-[70%] pt-0 py-10 px-5'>
      <h3
        className={`font-semibold font-IBM border-b pb-2 ${
          appearance.theme == 'dark' ? 'text-white' : 'text-gray-600'
        }`}
      >
        Activity Log
      </h3>

      <section className='w-full h-full py-5 overflow-y-auto overflow-x-clip [scrollbar-width:thin]'>
        {items.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-full gap-3'>
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center ${
                appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-slate-100'
              }`}
            >
              <TableOfContents className='w-7 h-7 text-orange-400' />
            </div>
            <p
              className={`text-sm font-satoshi font-medium ${
                appearance.theme == 'dark' ? 'text-white' : 'text-slate-600'
              }`}
            >
              No activity yet
            </p>
            <p
              className={`text-xs font-satoshi text-center max-w-48 ${
                appearance.theme == 'dark' ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Your activity will appear here once you start using the app
            </p>
          </div>
        ) : (
          <section className='flex flex-col gap-2'>
            {items.map(item => (
              <section className='flex flex-col gap-2' key={item.id}>
                <div className='flex w-full gap-2 items-center'>
                  <p
                    className={`p-1.5 py-2 rounded-lg flex justify-center items-center ${
                      appearance.theme == 'dark'
                        ? 'bg-[#202020] text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {findIcon(item.type.toLowerCase())}
                  </p>
                  <p
                    className={`text-sm font-IBM ${
                      appearance.theme == 'dark' ? 'text-white' : 'text-black'
                    }`}
                  >
                    {item.message}
                  </p>
                </div>
                <div
                  className={`flex w-full border-l-3 h-9 ml-3 pl-5 gap-3 items-start ${
                    appearance.theme == 'dark'
                      ? 'border-slate-700'
                      : 'border-gray-300'
                  }`}
                >
                  <p
                    className={`text-xs font-IBM ${
                      appearance.theme == 'dark'
                        ? 'text-slate-400'
                        : 'text-black'
                    }`}
                  >
                    {formatDate(item.updatedAt)}
                  </p>
                </div>
              </section>
            ))}
            {hasMore && (
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className={`w-full mt-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  appearance.theme == 'dark'
                    ? 'text-slate-400 hover:text-white hover:bg-[#202020]'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                } disabled:opacity-50`}
              >
                {loadingMore ? (
                  <span className='flex items-center justify-center gap-2'>
                    <Loader className='w-3 h-3 animate-spin' />
                    Loading...
                  </span>
                ) : (
                  `Show more (${total - items.length} remaining)`
                )}
              </button>
            )}
          </section>
        )}
      </section>
    </section>
  )
}
