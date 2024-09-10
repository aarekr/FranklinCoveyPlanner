import { render, screen } from '@testing-library/react'
import Task from './Task'
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
