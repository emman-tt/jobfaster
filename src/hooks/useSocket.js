import { toast } from 'sonner'
import { toastPresets } from '../components/toasters'

let ws = null
let isConnecting = false

const callbacks = {
  JOB_APPLY: null,
  
}

export function connector () {
  if (ws && ws.readyState === WebSocket.OPEN) {
    console.log('Already connected')
    return
  }

  if (ws && ws.readyState === WebSocket.CONNECTING) {
    console.log('Already connecting...')
    return
  }

  if (ws && ws.readyState === WebSocket.CLOSED) {
    console.log('Connection was closed, reconnecting...')
    ws = null
  }

  console.log('Creating new connection...')
  ws = new WebSocket('ws://localhost:5000/')

  ws.onopen = () => {
    console.log('Connected')
    isConnecting = true
  }

  ws.onmessage = event => {
    const res = JSON.parse(event.data)

    const { type, data } = res

    if (type == 'JOB_APPLY' && callbacks.JOB_APPLY) {
      return callbacks.JOB_APPLY(data)
    }  else {
      console.warn(
        'No registered callback fot this process or callback wasnt called and added'
      )
    }
  }

  ws.onerror = error => {
    console.error('Error:', error)
    toast.dismiss('ai-processing')
    toast.error('AI Error', toastPresets.aiError())
  }

  ws.onclose = () => {
    console.log('Disconnected')
    ws = null
  }
}

export function sendMessage (type, data) {
  if (ws && ws.readyState === WebSocket.CLOSED) {
    console.log('reconnecting')
  }

  if (!ws || ws.readyState !== WebSocket.OPEN) {
    toast.error('Connection Lost', {
      ...toastPresets.aiError(
        "We couldn't start the process. Please check your connection and try again."
      ),
      id: 'ai-error',
      position: 'top-right'
    })
    console.error('Not connected', ws?.readyState)
    return false
  }

  toast.loading(type == 'JOB_APPLY' ? 'AI Processing' : 'Resume Processing', {
    ...toastPresets.aiProcessing(),
    description: 'Updating and saving resume to our system',
    id: 'ai-processing',
    position: 'top-right'
  })

  ws.send(JSON.stringify({ type, data }))
  return true
}

export function onJobApply (cb) {
  callbacks.JOB_APPLY = cb
}

