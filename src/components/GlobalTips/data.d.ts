export interface MessageType {
  info: (text: string) => void
  success: (text: string) => void
  warning: (text: string) => void
  error: (text: string) => void
}

export interface AddType {
  text: string
  key: string
  type: 'info' | 'success' | 'error' | 'warning'
  i: 'i' | '√' | 'x' | '!'
}
