import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { uploadCsvData } from './csvAction';
import { CsvDataRow } from './type';

export interface CsvState {
  data: CsvDataRow[];
}

const initialState: CsvState = {
  data: [],
};

export default createReducer(initialState, {
  [uploadCsvData.type]: (state, action: PayloadAction<CsvDataRow[]>) => {
    state.data = action.payload;
  },
});
