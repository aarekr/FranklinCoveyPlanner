import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Task from './Task'
import App from '../App'
import { expect } from 'vitest'

test('renders name, priority, number, done correctly', async () => {
  const task = {
    done: 'false',
    priority: 'A',
    number: 1,
    name: 'Java Spring Boot Advanced Security',
  }

  render(<Task done={task.done} priority={task.priority} number={task.number}
    name={task.name} text={'mark done'} />)
  
  // screen.debug()             // shows HTML in console
  // screen.debug(elementName)  // shows element in console

  const elementName = screen.getByText('Java Spring Boot Advanced Security')
  expect(elementName).toBeDefined()
  const elementPriority = screen.getByText('A')
  expect(elementPriority).toBeDefined()
  const elementNumber = screen.getByText('1')
  expect(elementNumber).toBeDefined()
  const elementDone = screen.getByText('false')
  expect(elementDone).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const task = {
    done: 'false',
    priority: 'A',
    number: 1,
    name: 'Java Spring Boot Advanced Security',
  }

  const mockHandler = vi.fn()

  render(<Task setToDone={App.setToDone} done={task.done} priority={task.priority} number={task.number}
    name={task.name} text={'mark done'} />)

  const user = userEvent.setup()
  const button = screen.getByText('mark done')
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
})
