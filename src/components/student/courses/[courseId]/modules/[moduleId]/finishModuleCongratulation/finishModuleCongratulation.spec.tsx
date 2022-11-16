/**
 * @jest-environment jest-environment-jsdom
 */

import { render, screen } from '@testing-library/react'
import FinishModuleCongratulation from '.'

describe('<FinishModuleCongratulation />', () => {
  it('should render a heading', () => {
    render(<FinishModuleCongratulation loading={false} courseId="id" />)
    expect(screen.getByText("Parabéns você completou este módulo", { selector: 'h2' }))
  })

  it('should render a paragraph and spinner when loading', () => {
    render(<FinishModuleCongratulation loading={true} courseId="id" />)
    expect(screen.getByText("Estamos salvando as suas respostas", { selector: 'p' }))
    expect(screen.getByRole("status"))
  })
})
