import { type UserDto } from '../types/user';

export const createGraphFromUserDto = (data: UserDto | undefined) => {
  return {
    nodes: [
      { id: -1, name: data?.name, group: -1 },
      ...(data?.hasConnectionTo?.map((c, index) => {
        return {
          id: c,
          name: c,
          group: index,
        };
      }) ?? []),
    ],
    links:
      data?.hasConnectionTo?.map((c) => {
        return {
          source: -1,
          target: c,
        };
      }) ?? [],
  };
};
