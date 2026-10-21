export type Priority = 'low' | 'medium' | 'high'

export interface Tz {
  id: number
  processName: string
  description: string
  targetUrl: string
  fields: string[]
  priority: Priority
  createdAt: string
}

export type TzInput = Omit<Tz, 'id' | 'createdAt'>