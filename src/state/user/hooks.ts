import { useAppDispatch, useAppSelector } from '../hooks';
import type { RootState } from '../index';
import { updateUserLocale } from './reducer';
import { useCallback } from 'react';

export function useUserLocale(): string | null {
  return useAppSelector((state: RootState) => state.user.userLocale);
}

export function useUserLocaleManager(): [
  string | null,
  (newLocale: string) => void,
] {
  const dispatch = useAppDispatch();
  const locale = useUserLocale();

  const setLocale = useCallback(
    (newLocale: string) => {
      dispatch(updateUserLocale({ userLocale: newLocale }));
    },
    [dispatch]
  );

  return [locale, setLocale];
}
