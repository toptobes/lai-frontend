import { useSearchParams } from 'next/navigation';

export const useCurrentConvo = () =>
  useSearchParams().get('c')
    ?? undefined;
