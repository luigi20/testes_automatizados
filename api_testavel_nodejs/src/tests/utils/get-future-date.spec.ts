import {expect, it} from 'vitest';
import { getFuture } from './get-future-date';


it ('increases year the date', () => {
  const year = new Date().getFullYear();
  expect(getFuture(`${year}-08-01`).getFullYear()).toEqual(2025);
})