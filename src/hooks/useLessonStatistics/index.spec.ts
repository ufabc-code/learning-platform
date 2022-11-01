/**
 * @jest-environment jest-environment-jsdom
 */

import { renderHook } from '@testing-library/react'

import useLessonStatistics from '.'

describe('useLessonStatistics', () => {
  it('should return empty object', () => {
    // const { result } = renderHook(() => useLessonStatistics())
    // expect(result.current).toEqual({})
  })
})
