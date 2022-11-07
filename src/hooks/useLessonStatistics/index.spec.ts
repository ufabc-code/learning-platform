/**
 * @jest-environment jest-environment-jsdom
 */

import { renderHook } from '@testing-library/react'
import { trpc } from 'utils/trpc'

jest.mock('utils/trpc', () => ({
  trpc: {
    useQuery: jest.fn().mockReturnValue({
      data: {
        id: '1234',
        title: 'Curso de Python',
        description: 'este curso ensina python',
        modules: [
          {
            id: '1234',
            title: 'variaveis',
            description: 'ensina variaveis',
            lessons: [
              {
                id: '1234',
                type: 'code',
                solution: {
                  text: 'esta é uma explicação',
                  code: "print('ola')",
                  language: 'python',
                },
                template: { code: '# template basico', language: 'pyhton' },
                tests: [
                  { input: 'ola', expected: 'ola' },
                  { input: 'mundo', expected: 'ola' },
                ],
                text: 'string',
              },
              {
                id: '12345',
                type: 'quiz',
                text: 'selecione algo',
                alternatives: [
                  { text: 'Alternativa 1' },
                  { text: 'Alternativa 2' },
                  { text: 'Errada 1' },
                  { text: 'Errada 2 ' },
                ],
                solution: { text: 'correta é a 1 e 2', correct: [0, 1] },
              },
            ],
          },
        ],
        slug: 'curso-python',
      },
      isLoading: false,
      error: {},
    }),
    useMutation: jest.fn().mockReturnValue({
      mutate: jest.fn(),
    }),
  },
}))

import useLessonStatistics from '.'

describe('useLessonStatistics', () => {
  it('should return the first lesson of module', () => {
    const { result } = renderHook(() =>
      useLessonStatistics({ courseId: '1234', moduleId: '1234' }),
    )

    expect(result.current.lesson).toMatchObject({
      id: '1234',
      type: 'code',
      solution: {
        text: 'esta é uma explicação',
        code: "print('ola')",
        language: 'python',
      },
      template: { code: '# template basico', language: 'pyhton' },
      tests: [
        { input: 'ola', expected: 'ola' },
        { input: 'mundo', expected: 'ola' },
      ],
      text: 'string',
    })
  })
})
