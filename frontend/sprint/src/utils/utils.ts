export const iconString = (name: string): string => name.substring(0, 1).toUpperCase();
export const shuffleList = (list: number[]): number[] => {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};
