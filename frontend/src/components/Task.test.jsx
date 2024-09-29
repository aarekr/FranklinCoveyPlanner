/* eslint-disable no-unused-vars, no-undef */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Task from './Task'
import App from '../App'
import { expect } from 'vitest'
import Home from './Home'
import NewTaskForm from './NewTaskForm'

test('Home page renders 3 task headlines correctly', async () => {
  render(<Home />)
  const priotizedDailyText = screen.getByText('Prioritized Daily Tasks List')
  expect(priotizedDailyText).toBeDefined()
  const todaysText = screen.getByText(`Today's tasks`)
  expect(todaysText).toBeDefined()
  const todaysCompletedText = screen.getByText(`Today's completed tasks`)
  expect(todaysCompletedText).toBeDefined()
})

test('Task name, priority, number, done rendered correctly', async () => {
  const task = {
    done: 'false',
    priority: 'A',
    number: 1,
    name: 'Java Spring Boot Advanced Security',
  }

  render(<Task setToDone={App.setToDone} done={task.done} priority={task.priority} number={task.number}
    name={task.name} text={'done'} />)
  
  // screen.debug()             // shows HTML in console
  // screen.debug(elementName)  // shows element in console

  const elementName = screen.getByText('Java Spring Boot Advanced Security')
  expect(elementName).toBeDefined()
  const elementPriority = screen.getByText('A')
  expect(elementPriority).toBeDefined()
  const elementNumber = screen.getByText('1')
  expect(elementNumber).toBeDefined()
  //const elementDone = screen.getByButton('done')
  //expect(elementDone).toBeDefined()
})

test('NewTaskForm shows texts: Task, Priority, Number, Add task Button', () => {
  render(<NewTaskForm />)
  const taskText = screen.getByText('Task:')
  const priorityText = screen.getByText('Priority:')
  const numberText = screen.getByText('Number:')
  const addButton = screen.getByText('Add task')
  expect(taskText).toBeDefined()
  expect(priorityText).toBeDefined()
  expect(numberText).toBeDefined()
  expect(addButton).toBeDefined()
})

test('Adding new tasks', async () => {
  render(<NewTaskForm />)
  const user = userEvent.setup()
  const addButton = screen.getByText('Add task')
  await user.click(addButton)
})
