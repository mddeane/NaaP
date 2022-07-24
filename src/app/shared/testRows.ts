import { Story } from '../story/story.model';
import { RundownRow } from './../rundown-row/rundownRow.model';
export const TEST_ROWS: RundownRow[] = [
    new RundownRow(
        11111,
        "STORY",
        "A1",
        new Story(
            11111,
            "EMPTY",
            "Story Title 1",
            "Script for Story 1",
            30000,
            []),
        []
    ),
    new RundownRow(
        22222,
        "STORY",
        "A2",
        new Story(
            22222,
            "EMPTY",
            "Story Title 2",
            "Script for Story 2",
            45000,
            []),
        []
    ),
    new RundownRow(
        33333,
        "STORY",
        "A3",
        new Story(
            33333,
            "EMPTY",
            "Story Title 3",
            "Script for Story 3",
            30000,
            []),
        []
    ),
    new RundownRow(
        44444,
        "STORY",
        "A4",
        new Story(
            44444,
            "EMPTY",
            "Story Title 4",
            "Script for Story 4",
            60000,
            []),
        []
    )
]