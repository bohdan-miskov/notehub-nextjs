import { formatDistanceToNow } from 'date-fns';

export default function formatDateToNow(date: Date) {
  return formatDistanceToNow(date);
}
