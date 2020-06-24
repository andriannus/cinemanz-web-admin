import {
  PaginatedData,
  PaginationOptions,
} from '@app/shared/utils/pagination/pagination.model';

export function paginate<T>(
  data: T[],
  options: PaginationOptions,
): PaginatedData<T> {
  const { page, limit, total } = options;
  const totalPage = Math.ceil(total / limit);

  return {
    data,
    meta: {
      page,
      perPage: limit,
      prevPage: page - 1 ? page - 1 : null,
      nextPage: totalPage > page ? page + 1 : null,
      total,
      totalPage,
    },
  };
}
