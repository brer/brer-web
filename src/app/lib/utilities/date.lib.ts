import { format } from 'date-fns'

export function formatDate(stringDate: string): string {
  return format(new Date(stringDate), 'dd MMM yy, HH:mm:SS')
}
