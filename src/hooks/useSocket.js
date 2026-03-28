import { toast } from 'sonner'
import { toastPresets } from '../components/toasters'

let ws = null
let messageCallback = null
let isConnecting = false

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
  ws = new WebSocket('ws://localhost:3000')

  ws.onopen = () => {
    console.log('Connected')
    isConnecting = false
  }

  ws.onmessage = event => {
    const data = event.data

    toast.dismiss('ai-processing')
    const status = data.status
    if (status == false) {
      return toast.error('Ai tailoring error', toastPresets.aiError())
    }
    if (status == true) {
      return toast.success('Ready!', {
        ...toastPresets.aiSuccess(
          'Resume processed successfully! Redirecting you to your tailored resume...'
        ),
        id: 'ai-success',
        position: 'top-right'
      })
    }

    if (messageCallback) {
      messageCallback(data)
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

  toast.loading('AI Processing', {
    ...toastPresets.aiProcessing(),
    id: 'ai-processing',
    position: 'top-right'
  })

  ws.send(JSON.stringify({ type, data }))
  return true
}

export function setCallback (callback) {
  messageCallback = callback
}
