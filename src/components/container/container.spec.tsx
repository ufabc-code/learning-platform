/**
 * @jest-environment jest-environment-jsdom
 */

import Container from '.'
import { render, screen } from '@testing-library/react'

describe('<Container />', () => {
  test('should render a container and its children', () => {
    render(
      <Container>
        <h1>Test</h1>
      </Container>,
    )
    expect(screen.getByTestId('container')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
