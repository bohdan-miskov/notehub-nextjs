import { MAX_PAG_COUNT } from '@/constants';

export default function calcPaginArray(
  page: number,
  totalPages: number
): number[] {
  const endPosition = calcEndPosition(page, totalPages);
  const startPosition =
    endPosition - MAX_PAG_COUNT > 1 ? endPosition - MAX_PAG_COUNT + 1 : 1;
  const pagArray = [];
  for (let i = startPosition; i <= endPosition; i++) {
    pagArray.push(i);
  }

  return pagArray;
}

function calcEndPosition(page: number, totalPages: number) {
  if (totalPages < MAX_PAG_COUNT) {
    return totalPages;
  }

  const secondPart = Math.ceil(MAX_PAG_COUNT / 2) - 1;
  if (page + secondPart <= totalPages) {
    return page + secondPart;
  } else {
    return totalPages;
  }
}
