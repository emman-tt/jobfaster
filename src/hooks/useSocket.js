// services/websocket.js
let ws = null
let messageCallback = null
let isConnecting = false // Prevent multiple connection attempts

export function connector () {
  // Check if already connected
  if (ws && ws.readyState === WebSocket.OPEN) {
    console.log('Already connected')
    return
  }

  // Check if currently connecting
  if (ws && ws.readyState === WebSocket.CONNECTING) {
    console.log('Already connecting...')
    return
  }

  // Check if connection exists but is closed
  if (ws && ws.readyState === WebSocket.CLOSED) {
    console.log('Connection was closed, reconnecting...')
    ws = null
  }

  // Create new connection
  console.log('Creating new connection...')
  ws = new WebSocket('ws://localhost:3000')

  ws.onopen = () => {
    console.log('Connected')
    isConnecting = false
  }

  ws.onmessage = event => {
    const data = JSON.parse(event.data)

    if (messageCallback) {
      messageCallback(data)
    }
  }

  ws.onerror = error => {
    console.error('Error:', error)
  }

  ws.onclose = () => {
    console.log('Disconnected')
    ws = null
  }
}

export function sendMessage (type, data) {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.error('Not connected', ws?.readyState)
    return false
  }
  ws.send(JSON.stringify({ type, data }))
  return true
}

export function setCallback (callback) {
  messageCallback = callback
}
