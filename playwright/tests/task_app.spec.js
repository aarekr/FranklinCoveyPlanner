const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Task app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('front page opens and has the required texts', async ({ page }) => {
        const locator = await page.getByText('Franklin Covey Planner')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Prioritized Daily Tasks List')).toBeVisible()
        await expect(page.getByText('Today\'s tasks')).toBeVisible()
        await expect(page.getByText('Today\'s completed tasks')).toBeVisible()
        await expect(page.getByText('Add new tasks')).toBeVisible()
    })

    test('a new task can be added with correct data', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await page.getByTestId('taskname').fill('Playwright')
        await page.getByTestId('priority').fill('A')
        await page.getByTestId('number').fill('3')
        await page.getByRole('button', { name: 'Add task' }).click()
        await expect(page.getByText('Playwright')).toBeVisible()
    })

    test('a new task is not added with missing task name', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await page.getByTestId('taskname').fill('')
        await page.getByTestId('priority').fill('X')
        await page.getByTestId('number').fill('9')
        await page.getByRole('button', { name: 'Add task' }).click()
        await expect(page.getByText('false')).not.toBeVisible()
        await expect(page.getByText('X')).not.toBeVisible()
        await expect(page.getByText('9')).not.toBeVisible()
    })

    test('a new task is not added with missing priority', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await page.getByTestId('taskname').fill('No priority task')
        await page.getByTestId('priority').fill('')
        await page.getByTestId('number').fill('9')
        await page.getByRole('button', { name: 'Add task' }).click()
        await expect(page.getByText('No priority task')).not.toBeVisible()
        await expect(page.getByText('9')).not.toBeVisible()
    })

    /*test('a new task is not added with missing number', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await page.getByTestId('taskname').fill('No number task')
        await page.getByTestId('priority').fill('X')
        await page.getByTestId('number').fill('')
        await page.getByRole('button', { name: 'Add task' }).click()
        await expect(page.getByText('No number task')).not.toBeVisible()
        await expect(page.getByText('X')).not.toBeVisible()
    })*/

    test('task can be marked done', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await page.getByTestId('taskname').fill('This task will be done for sure')
        await page.getByTestId('priority').fill('B')
        await page.getByTestId('number').fill('2')
        await page.getByRole('button', { name: 'Add task' }).click()
        await expect(page.getByText('This task will be done for sure')).toBeVisible()
        await expect(page.getByText('false')).toBeVisible()
        await page.getByRole('button', { name: 'mark done' }).click()
        await expect(page.getByText('This task will be done for sure')).toBeVisible()
        await expect(page.getByText('false')).not.toBeVisible()
        //await expect(page.getByText('true')).toBeVisible()  // other true items cause failure
    })

    // write a test for marking undone

    // write tests when several tasks are on the lists
})
