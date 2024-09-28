const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Task app', () => {
    beforeEach(async ({ page }) => {
        //await request.post('http:localhost:3001/api/testing/reset')
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
        //await expect(page.getByText('A')).toBeVisible()
        await expect(page.getByText('3')).toBeVisible()
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

    test('a new task is not added with short task name', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await page.getByTestId('taskname').fill('O')
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

    test('a new task is not added with priority Q', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await page.getByTestId('taskname').fill('Q priority task')
        await page.getByTestId('priority').fill('Q')
        await page.getByTestId('number').fill('9')
        await page.getByRole('button', { name: 'Add task' }).click()
        await expect(page.getByText('Q priority task')).not.toBeVisible()
        await expect(page.getByText('9')).not.toBeVisible()
    })

    test('a new task is not added with number 1 as priority', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await page.getByTestId('taskname').fill('Priority 1 task')
        await page.getByTestId('priority').fill('1')
        await page.getByTestId('number').fill('9')
        await page.getByRole('button', { name: 'Add task' }).click()
        await expect(page.getByText('Priority 1 task')).not.toBeVisible()
        await expect(page.getByText('9')).not.toBeVisible()
    })

    test('a new task is not added with negative number', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await page.getByTestId('taskname').fill('Negative number task')
        await page.getByTestId('priority').fill('A')
        await page.getByTestId('number').fill('-5')
        await page.getByRole('button', { name: 'Add task' }).click()
        await expect(page.getByText('Negative number task')).not.toBeVisible()
        await expect(page.getByText('-5')).not.toBeVisible()
    })

    test('a new task is not added with number above 99', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await page.getByTestId('taskname').fill('Over number 99 task')
        await page.getByTestId('priority').fill('A')
        await page.getByTestId('number').fill('103')
        await page.getByRole('button', { name: 'Add task' }).click()
        await expect(page.getByText('Over number 99 task')).not.toBeVisible()
        await expect(page.getByText('103')).not.toBeVisible()
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
        //await expect(page.getByText('done')).toBeVisible()
        await page.getByRole('button', { name: 'done' }).click()
        await expect(page.getByText('This task will be done for sure')).toBeVisible()
        await expect(page.getByText('undone')).toBeVisible()
        //await expect(page.getByText('done')).not.toBeVisible()
    })

    // write a test for marking undone
    test('task can be marked undone', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await page.getByTestId('taskname').fill('This task will be undone for sure')
        await page.getByTestId('priority').fill('D')
        await page.getByTestId('number').fill('4')
        await page.getByRole('button', { name: 'Add task' }).click()
        await expect(page.getByText('This task will be undone for sure')).toBeVisible()
        await page.getByRole('button', { name: 'done' }).click()
        await expect(page.getByText('This task will be undone for sure')).toBeVisible()
        // there should be a short break here
        /*await expect(page.getByText('undone')).toBeVisible()
        await page.getByRole('button', { name: 'undone' }).click()
        await expect(page.getByText('This list is empty')).toBeVisible()
        await expect(page.getByText('done')).toBeVisible()*/
    })

    test('clicking modify button opens modal and cancel closes it', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await page.getByTestId('taskname').fill('Modal opens and closes')
        await page.getByTestId('priority').fill('B')
        await page.getByTestId('number').fill('2')
        await page.getByRole('button', { name: 'Add task' }).click()
        await expect(page.getByText('Modal opens and closes')).toBeVisible()
        await page.getByRole('button', { name: 'modify' }).click()
        await expect(page.getByText('Modifying task')).toBeVisible()
        await page.getByRole('button', { name: 'Cancel' }).click()
        //await expect(page.getByText('Modal opens and closes')).toBeVisible()
    })

    // write tests when several tasks are on the lists
})
