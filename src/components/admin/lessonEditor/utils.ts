import CodeLesson from 'server/entities/codeLesson'
import QuizLesson from 'server/entities/quizLesson'

export function emptyCodeLesson(): CodeLesson {
  return {
    id: Math.random().toString(),
    type: 'code',
    solution: {
      code: '',
      language: '',
      text: '',
    },
    template: {
      code: '',
      language: '',
    },
    tests: [],
    text: 'string',
  }
}

export function emptyQuizLesson(): QuizLesson {
  return {
    id: Math.random().toString(),
    type: 'quiz',
    text: '',
    alternatives: [],
    solution: {
      text: '',
      correct: [],
    },
  }
}
