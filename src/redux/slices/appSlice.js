// @flow
import { createSlice } from '@reduxjs/toolkit';
import type {
  Slice,
  SliceCaseReducers,
  SliceSelectors,
} from '@reduxjs/toolkit';

import { THEME } from '../../enums/app';

type AppRedux = Record<string, mixed> & {
  theme: string,
};

type UpdateStorePayload = {
  key: string,
  value: mixed,
};

type PayloadAction<T> = {
  type: string,
  payload: T,
};

const appSlice: Slice<
  AppRedux,
  SliceCaseReducers<AppRedux>,
  string,
  string,
  SliceSelectors<AppRedux>,
> = createSlice({
  name: 'app',
  initialState: {
    theme: THEME.LIGHT,
  },
  reducers: {
    updateStore: (
      state: AppRedux,
      action: PayloadAction<UpdateStorePayload>,
    ) => {
      if (action?.payload?.key && action?.payload?.value != null) {
        const newState = state;
        newState[action.payload.key] = action.payload.value;
        return newState;
      }
      return state;
    },
    setDarkTheme: state => ({
      ...state,
      theme: THEME.DARK,
    }),
    setLightTheme: state => ({
      ...state,
      theme: THEME.LIGHT,
    }),
  },
});

export { appSlice };
export const { updateStore, setDarkTheme, setLightTheme } = appSlice.actions;
