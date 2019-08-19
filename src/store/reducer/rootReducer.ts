/*Library Imports */
import * as _ from "lodash";
import { toWords } from "number-to-words";
import { wordsToNumbers } from "words-to-numbers";

/* Type Imports */
import { Action } from "../../types/store/reducer";

const initialState = {
  currentLesson: "one",
  one: {
    currentPage: "one",
    one: {
      currentKey: 0,
      keys: [{ letter: "f", passed: false }, { letter: "j", passed: false }]
    },
    two: {
      currentKey: 0,
      keys: [{ letter: " ", passed: false }]
    },
    three: {
      currentKey: 0,
      keys: [
        { letter: "f", passed: false },
        { letter: "f", passed: false },
        { letter: "f", passed: false },
        { letter: "j", passed: false },
        { letter: "j", passed: false },
        { letter: "j", passed: false },
        { letter: "f", passed: false },
        { letter: "f", passed: false },
        { letter: "j", passed: false },
        { letter: "f", passed: false },
        { letter: "j", passed: false }
      ]
    },
    four: {
      currentKey: 0,
      keys: [
        { letter: "a", passed: false },
        { letter: "a", passed: false },
        { letter: "a", passed: false },
        { letter: "a", passed: false },
        { letter: "a", passed: false },
        { letter: "a", passed: false },
        { letter: "a", passed: false },
        { letter: "a", passed: false },
        { letter: "a", passed: false },
        { letter: "a", passed: false },
        { letter: "a", passed: false }
      ]
    },
    five: {
      currentKey: 0,
      keys: [
        { letter: "b", passed: false },
        { letter: "b", passed: false },
        { letter: "b", passed: false },
        { letter: "b", passed: false },
        { letter: "b", passed: false },
        { letter: "b", passed: false },
        { letter: "b", passed: false },
        { letter: "b", passed: false },
        { letter: "b", passed: false },
        { letter: "b", passed: false },
        { letter: "b", passed: false }
      ]
    },
    six: {
      currentKey: 0,
      keys: [
        { letter: "c", passed: false },
        { letter: "c", passed: false },
        { letter: "c", passed: false },
        { letter: "c", passed: false },
        { letter: "c", passed: false },
        { letter: "c", passed: false },
        { letter: "c", passed: false },
        { letter: "c", passed: false },
        { letter: "c", passed: false },
        { letter: "c", passed: false },
        { letter: "c", passed: false }
      ]
    }
  }
};

export function reducer(state = initialState, action: Action) {
  const { payload, type } = action;
  switch (type) {
    case "correctKey": {
      const { currentPage, currentKey, currentLesson } = payload;
      const updatedLesson = _.cloneDeep(state[currentLesson]);
      updatedLesson[currentPage].keys[currentKey].passed = true;
      updatedLesson[currentPage].currentKey += 1;
      const finishedPage = !_.some(updatedLesson[currentPage].keys, {
        passed: false
      });
      if (finishedPage) {
        const currentPageInt = wordsToNumbers(currentPage);
        const newPage = currentPageInt + 1;
        updatedLesson.currentPage = toWords(newPage);
      }
      return {
        ...state,
        [currentLesson]: { ...state[currentLesson], ...updatedLesson }
      };
    }
    default: {
      return state;
    }
  }
}
