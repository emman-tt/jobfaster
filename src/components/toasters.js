// Create reusable toast presets
import { FileEditIcon } from 'lucide-react'
export const toastPresets = {
  tailorResume: fileName => ({
    description: `Tailoring resume ${fileName} in the background`,
    position: 'top-right',
    duration: 2500,

    style: {
      background: 'black',
      color: 'white'
    }
  }),

  sendingApplication: () => ({
    position: 'bottom-center',
    duration: Infinity,
    description: 'This may take a moment...'
  }),

  applicationSent: company => ({
    position: 'top-center',
    duration: 4000,
    description: `Application sent to ${company}`,
    action: {
      label: 'Track',
      onClick: () => window.open('/dashboard')
    }
  })
}
