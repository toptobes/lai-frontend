import { useState } from 'react';
import { not } from '~/lib/prelude';

export const useHideState = (initialState = false) => {
  const [shown, setShown] = useState(initialState);

  const hide = () => setShown(true);
  const show = () => setShown(false);
  const toggleShown = () => setShown(not);

  const action = shown
    ? 'hide'
    : 'show';

  return { shown, hide, show, toggleShown, action };
}
