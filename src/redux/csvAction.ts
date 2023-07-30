import { createAction } from '@reduxjs/toolkit';
import { CsvDataRow } from './type';

export const uploadCsvData = createAction<CsvDataRow[]>('UPLOAD_CSV_DATA');
