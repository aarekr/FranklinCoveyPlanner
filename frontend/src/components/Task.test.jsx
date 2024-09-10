import { render, screen } from '@testing-library/react'
import Task from './Task'

test('renders name', () => {
  const task = {
    done: 'false',
    priority: 'A',
    number: 1,
    name: 'Java',
  }

  render(<Task task={task} />)

  const element = screen.getByText('Java')
  expect(element).toBeDefined()
})
