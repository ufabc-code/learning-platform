import QuizLesson from 'server/entities/quizLesson'
import { QuizUserAnswer } from 'server/entities/quizUserAnswer'

const quizLesson = (): QuizLesson => {
  return {
    id: 'course-1-module-1-quiz-1',
    type: 'quiz',
    text: '',
    alternatives: [
      {
        text: 'correct-1',
      },
      {
        text: 'correct-2',
      },
      {
        text: 'wrong-3',
      },
    ],
    solution: {
      text: '',
      correct: [0, 1],
    },
  }
}

const correctAnswer = () =>
  new QuizUserAnswer({
    alternatives: [0, 1],
  })

const wrongAlternativeSelected = () =>
  new QuizUserAnswer({
    alternatives: [2],
  })

const missingCorrectAlternative = () =>
  new QuizUserAnswer({
    alternatives: [0],
  })

export function createQuizLesson() {
  return {
    lesson: quizLesson,
    correctAnswer,
    wrongAlternativeSelected,
    missingCorrectAlternative,
  }
}
