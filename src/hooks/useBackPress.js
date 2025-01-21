// @flow
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  clearStack,
  popStack,
  pushStack,
} from '../redux/slices/navigationSlice';
import beforeUnload from '../utils/eventListeners/beforeUnload';
import { errorLog, log } from '../utils/logsUtils';
import { APP_UNMOUNT, BACK_CLICK } from '../enums/app';

function useBackPress(): UseBackPress {
  const { stack } = useSelector(state => state.navigation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackPress = useCallback(() => {
    if (stack.length) {
      dispatch(popStack());
    } else {
      const res = navigate(-1);
      if (res instanceof Promise) {
        res
          .then(() => {
            log(BACK_CLICK.SUCCESS);
          })
          .catch(err => {
            errorLog(BACK_CLICK.ERROR, err);
          });
      }
    }
  }, [stack]);

  window.backPress = handleBackPress;

  useEffect(() => {
    beforeUnload.subscribe(() => {
      log(APP_UNMOUNT);
    });

    return () => {
      beforeUnload.unSubscribe();
    };
  }, []);

  function push(callback: VoidFunctionWithParams<mixed>) {
    dispatch(pushStack(callback));
  }

  function pop() {
    handleBackPress();
  }

  const clear = useCallback(() => {
    if (stack.length) {
      dispatch(clearStack());
    }
  }, [stack]);

  return { stack, push, pop, clear };
}

export default useBackPress;
