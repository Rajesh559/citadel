type ClinetSidePagination<T> = {
  searchQueryFn?: (item: T) => boolean;
  count?: number;
  page?: number;
  sortCompareFn?: (item1: T, item2: T) => number;
};

/**
 * Handles client-side pagination for a list of data.
 *
 * @param data The list of data to be paginated.
 * @param options An object containing pagination options.
 * @param options.count The number of items to display per page. Defaults to 10.
 * @param options.page The current page number. Defaults to 1.
 * @param options.searchQueryFn A function to filter data based on a search query.
 * @param options.sortCompareFn A function to sort data.
 * @returns An object containing the paginated data and the total match count.
 */
export const handleClientSidePagination = <T>(
  data: T[],
  { count = 10, page = 1, searchQueryFn, sortCompareFn }: ClinetSidePagination<T> = {},
) => {
  let internalDataArr: T[] = [...data];
  if (searchQueryFn) {
    const temp: T[] = [];
    data.forEach(item => {
      const isSatisfy = searchQueryFn(item);
      if (isSatisfy) temp.push(item);
    });
    internalDataArr = temp;
  }
  if (sortCompareFn) internalDataArr.sort(sortCompareFn);

  const result = {
    data: internalDataArr.slice((page - 1) * count, page * count),
    totalMatchCount: internalDataArr.length,
  };
  return result;
};
