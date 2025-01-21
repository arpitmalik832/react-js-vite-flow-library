// @flow
import { useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDarkTheme, setLightTheme } from '../redux/slices/appSlice';
import preferredColorScheme from '../utils/eventListeners/preferredColorScheme';
import { THEME } from '../enums/app';

function useTheme() {
  const theme = useSelector(state => state.app.theme);
  const dispatch = useDispatch();

  const updateStore = useCallback((isDark: boolean) => {
    if (isDark) {
      if (theme !== THEME.DARK) {
        dispatch(setDarkTheme());
      }
    } else if (theme !== THEME.LIGHT) {
      dispatch(setLightTheme());
    }
  }, []);

  useLayoutEffect(() => {
    preferredColorScheme.subscribe(e => {
      updateStore(e.matches);
    });

    return () => {
      preferredColorScheme.unSubscribe();
    };
  }, []);
}

export default useTheme;
