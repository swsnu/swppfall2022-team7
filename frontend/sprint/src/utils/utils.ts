import { BASE_URL } from '@services/api';

export const iconString = (name: string): string => name.substring(0, 1).toUpperCase();

export const shuffleList = (list: number[]): number[] => {
  const crypto = window.crypto;
  for (let i = list.length - 1; i > 0; i--) {
    const random = new Uint8Array(1);
    crypto.getRandomValues(random);
    const j = Math.floor((random[0] / Math.pow(2, 8)) * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

export const parseUserId = (fileKey: string): string => fileKey?.split(/[/,_]/)[1] ?? '';
export const parseDocId = (fileKey: string): string => fileKey?.split(/[/,_]/)[2] ?? '';

export const parseUrl = (url: string | undefined): string | undefined => url !== '' && url !== undefined ? `${BASE_URL}media/${url}` : undefined;
export const authString = (): string => {
  const token = localStorage.getItem('token');
  if (token === null) return '';
  return `Token ${token}`;
};
