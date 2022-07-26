import { Rundown } from './../rundown/rundown.model';
import { TEST_ROWS_2 } from './testRows2';

export const TEST_RUNDOWN: Rundown = new Rundown(
    "5pm News Mon Jul 25 2022",
    "5PM_NEWS",
    "ACTIVE",
    new Date(Date.now()),
    61200000,
    63000000,
    TEST_ROWS_2)
