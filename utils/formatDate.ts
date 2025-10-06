import { formatDistanceToNow } from 'date-fns';

function formatDateToNow(date: Date) {
  return formatDistanceToNow(date);
}

export function formatDateContent(createdAt: Date, updatedAt: Date) {
  return updatedAt
    ? `Updated at: ${formatDateToNow(updatedAt)}`
    : `Created at: ${formatDateToNow(createdAt)}`;
}
