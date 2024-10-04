const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Old tasks page', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/oldcompleted')
    })

    test('old tasks page opens and has the required texts', async ({ page }) => {
        await expect(page.getByText('Franklin Covey Planner')).toBeVisible()
        await expect(page.getByText('Old completed tasks')).toBeVisible()
        await expect(page.getByText('Created')).toBeVisible()
        await expect(page.getByText('Priority')).toBeVisible()
        await expect(page.getByText('Number')).toBeVisible()
        //await expect(page.getByText('Task')).toBeVisible()
        await expect(page.getByText(`Add new tasks`)).not.toBeVisible()
    })

    test.only('user can navigate to home page by clicking the navbar link', async ({ page }) => {
        await page.getByRole('link', { name: 'HOME' }).click()
        await expect(page.getByText('Prioritized Daily Tasks List')).toBeVisible()
        await expect(page.getByText('Add new tasks')).toBeVisible()
        await expect(page.getByText('Old completed tasks')).not.toBeVisible()
    })
})
