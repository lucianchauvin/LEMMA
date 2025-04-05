import { test, expect } from '@playwright/test';
const username = process.env.USER;
const password = process.env.PASSWORD;

test("Login Page - Incorrect user cannot login", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill("wrong_username");
    await page.getByLabel("password").fill("wrong_password");

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that we are still on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");
});

test("Login Page - Correct user can login", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(username);
    await page.getByLabel("password").fill(password);

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Login Page - Can press logout button to logout", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(username);
    await page.getByLabel("password").fill(password);

    // Click login button
    await page.getByText("Login").last().click();

    // Click logout button
    await page.getByText("Logout").click();

    // Verify that we are on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");
});
