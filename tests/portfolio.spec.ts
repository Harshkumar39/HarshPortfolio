import { expect, test } from '@playwright/test'

test('home links lead to the LeetCode and printable resume routes', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: /live leetcode statistics/i })).toHaveAttribute('href', '/leetcode')
  await expect(page.getByRole('link', { name: /printable resume/i })).toHaveAttribute('href', '/resume')
})

test('a project case study loads from a direct route', async ({ page }) => {
  await page.goto('/projects/health-sync')
  await expect(page.getByRole('heading', { name: 'HealthSync HMS' })).toBeVisible()
  await expect(page.getByRole('link', { name: /view source/i })).toHaveAttribute('href', /HealthSync-HMS-/)
})

test('unknown project ids show a recovery link', async ({ page }) => {
  await page.goto('/projects/not-a-project')
  await expect(page.getByText('PROJECT NOT FOUND')).toBeVisible()
  await expect(page.getByRole('link', { name: /back to projects/i })).toHaveAttribute('href', '/projects')
})

test('printable resume has a print action', async ({ page }) => {
  await page.goto('/resume')
  await expect(page.getByRole('heading', { name: 'Harsh Kumar' })).toBeVisible()
  await expect(page.getByRole('button', { name: /print \/ save as pdf/i })).toBeVisible()
})

test('contact page validates fields and shows social profile logos', async ({ page }) => {
  await page.goto('/contact')

  await expect(page.getByRole('button', { name: /send message|open gmail draft/i })).toBeVisible()
  for (const profile of ['GitHub', 'LinkedIn', 'LeetCode', 'Instagram']) {
    await expect(page.getByRole('link', { name: profile })).toBeVisible()
  }

  await page.getByRole('button', { name: /send message|open gmail draft/i }).click()
  await expect(page.getByText('Please enter at least 2 characters.')).toBeVisible()
  await expect(page.getByText('Please enter a valid email address.')).toBeVisible()
  await expect(page.getByText('Please enter a subject.')).toBeVisible()
  await expect(page.getByText('Please enter at least 10 characters.')).toBeVisible()
})
