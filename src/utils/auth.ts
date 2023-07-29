export const getUserId = (sub?: string) => {
  return sub?.slice(sub.indexOf('|') + 1) ?? '';
};
