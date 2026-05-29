import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError (error) {
    return { hasError: true, error }
  }

  componentDidCatch (error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render () {
    if (this.state.hasError) {
      return (
        <div className='flex flex-col items-center justify-center h-screen bg-[#f3f5f7] p-10'>
          <h1 className='text-2xl font-bold font-IBM text-slate-800 mb-4'>
            Something went wrong
          </h1>
          <p className='text-sm text-slate-500 mb-6 text-center max-w-md'>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className='px-6 py-2.5 bg-[#f17e27] hover:bg-[#e16d16] text-white text-sm font-bold rounded-full transition-colors'
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
