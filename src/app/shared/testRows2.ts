import { Story } from '../story/story.model';
import { RundownRow } from './../rundown-row/rundownRow.model';
export const TEST_ROWS_2: RundownRow[] = [
    new RundownRow(
        211111,
        "STORY",
        "A1",
        new Story(
            2211111,
            "EMPTY",
            "Story Title 1",
            "Script for Story 1",
            30000,
            []),
        []
    ),
    new RundownRow(
        222222,
        "STORY",
        "A2",
        new Story(
            2222222,
            "EMPTY",
            "Story Title 2",
            "Script for Story 2",
            45000,
            []),
        []
    ),
    new RundownRow(
        233333,
        "BREAK",
        "A3",
        new Story(
            2233333,
            "EMPTY",
            "BREAK ONE",
            "",
            180000,
            []),
        []
    ),
    new RundownRow(
        244444,
        "STORY",
        "A4",
        new Story(
            2244444,
            "EMPTY",
            "Story Title 4",
            "Script for Story 4",
            60000,
            []),
        []
    )
]