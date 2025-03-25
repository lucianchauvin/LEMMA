import { test, expect } from '@playwright/test';

test("Login Page - Incorrect user cannot login", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
    await page.getByLabel("Username").waitFor();
    await page.getByLabel("Password").waitFor();
      
    // Fill in input forms
    await page.getByLabel("username").fill("wrong_username");
    await page.getByLabel("password").fill("wrong_password");

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that we are still on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");
});
