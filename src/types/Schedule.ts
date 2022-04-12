import { Time } from './Time';
export interface Schedule {
  year: number;
  month: number;
  date: number;
  day: string;
  times: Array<Time>;
}
