/* eslint-disable no-unused-vars, no-undef */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Task from './Task'
import App from '../App'
import { expect } from 'vitest'
import NewTaskForm from './NewTaskForm'

test('renders name, priority, number, done correctly', async () => {
  const task = {
    done: 'false',
    priority: 'A',
    number: 1,
    name: 'Java Spring Boot Advanced Security',
  }

  render(<Task setToDone={App.setToDone} done={task.done} priority={task.priority} number={task.number}
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

test('NewTaskForm shows texts: Task, Priority, Number, Add task Button', () => {
  render(<NewTaskForm />)
  const taskText = screen.getByText('Task:')
  const priorityText = screen.getByText('Priority:')
  const numberText = screen.getByText('Number:')
  const addButton = screen.getByText('Add task')
})
