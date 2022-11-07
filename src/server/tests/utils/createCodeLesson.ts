import CodeLesson from 'server/entities/codeLesson'
import { CodeUserAnswer } from 'server/entities/codeUserAnswer'
import { CodeRunnerStatus } from 'server/providers/codeRunner/iCodeRunner'

const codeLesson = (): CodeLesson => {
  return {
    id: 'course-1-module-1-code-1',
    type: 'code',
    solution: {
      code: '',
      language: '',
      text: ''
    },
    template: {
      code: '',
      language: ''
    },
    tests: [
      {
        input: 'input-1',
        expected: 'correct-output-1'
      },
      {
        input: 'input-2',
        expected: 'correct-output-2'
      }
    ],
    text: ''
  }
}

const correctAnswer = () =>
  new CodeUserAnswer({
    code: JSON.stringify({
      status: {
        'input-1': CodeRunnerStatus.OK,
        'input-2': CodeRunnerStatus.OK
      },
      outputs: {
        'input-1': 'correct-output-1',
        'input-2': 'correct-output-2'
      }
    }),
    language: ''
  })

const wrongAnswer = () =>
  new CodeUserAnswer({
    code: JSON.stringify({
      status: {
        'input-1': CodeRunnerStatus.OK,
        'input-2': CodeRunnerStatus.OK
      },
      outputs: {
        'input-1': 'wrong-answer',
        'input-2': 'correct-output-2'
      }
    }),
    language: ''
  })

const errorAnswer = () =>
  new CodeUserAnswer({
    code: JSON.stringify({
      status: {
        'input-1': CodeRunnerStatus.ERROR,
        'input-2': CodeRunnerStatus.OK
      },
      outputs: {
        'input-1': 'error',
        'input-2': 'correct-output-2'
      }
    }),
    language: ''
  })

const timeoutAnswer = () =>
  new CodeUserAnswer({
    code: JSON.stringify({
      status: {
        'input-1': CodeRunnerStatus.TIMEOUT,
        'input-2': CodeRunnerStatus.OK
      },
      outputs: {
        'input-1': 'timeout',
        'input-2': 'correct-output-2'
      }
    }),
    language: ''
  })

export function createCodeLesson() {
  return {
    lesson: codeLesson,
    correctAnswer,
    wrongAnswer,
    errorAnswer,
    timeoutAnswer
  }
}
