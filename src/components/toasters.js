

export const toastPresets = {
  aiProcessing: () => ({
    // icon: <Sparkles className='w-5 h-5 text-orange-400 animate-pulse' />,
    description:
      'Our AI is tailoring and rewriting your resume to perfection. This usually takes 20-40 seconds.',
    duration: Infinity,
    style: {
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(8px)',
      color: 'white',
      border: '1px solid rgba(241, 126, 39, 0.3)',
      borderRadius: '1.25rem',
      padding: '16px',
      fontSize: '14px'
    },
    className: 'font-satoshi shadow-2xl shadow-orange-900/10'
  }),

  aiSuccess: message => ({
    // icon: <CheckCircle2 className='w-5 h-5 text-emerald-400' />,
    description:
      message || 'Resume processed successfully! Redirecting you now...',
    duration: 5000,
    style: {
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(8px)',
      color: 'white',
      border: '1px solid rgba(52, 211, 153, 0.3)',
      borderRadius: '1.25rem',
      padding: '16px',
      fontSize: '14px'
    },
    className: 'font-satoshi shadow-2xl shadow-emerald-900/10'
  }),

  aiError: detail => ({
    // icon: <XCircle className='w-5 h-5 text-rose-400' />,
    description:
      detail ||
      'Something went wrong with the AI processing. Please check your connection and try again',
    duration: 6000,
    style: {
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(8px)',
      color: 'white',
      border: '1px solid rgba(251, 113, 133, 0.3)',
      borderRadius: '1.25rem',
      padding: '16px',
      fontSize: '14px'
    },
    className: 'font-satoshi shadow-2xl shadow-rose-900/10'
  }),
  authError: detail => ({
    description:
      detail ||
      'Something went wrong . Please check your connection and try again',
    duration: 6000,
    style: {
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(8px)',
      color: 'white',
      border: '1px solid rgba(251, 113, 133, 0.3)',
      borderRadius: '1.25rem',
      padding: '16px',
      fontSize: '14px'
    },
    className: 'font-satoshi shadow-2xl shadow-rose-900/10'
  }),

  tailorResume: fileName => ({
    // icon: <FileEditIcon className='w-4 h-4 text-orange-400' />,
    description: `Tailoring resume ${fileName} in the background`,
    position: 'top-right',
    duration: 2500,
    style: {
      background: 'black',
      color: 'white',
      borderRadius: '1rem'
    }
  }),

  sendingApplication: () => ({
    // icon: <Loader2 className='w-4 h-4 text-orange-400 animate-spin' />,
    position: 'bottom-center',
    duration: Infinity,
    description: 'This may take a moment...'
  }),

  applicationSent: company => ({
    // icon: <CheckCircle2 className='w-4 h-4 text-emerald-400' />,
    position: 'top-center',
    duration: 4000,
    description: `Application sent to ${company}`,
    action: {
      label: 'Track',
      onClick: () => window.open('/dashboard')
    }
  })
}
