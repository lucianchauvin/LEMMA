// Complete testing for the Login Page

import { test, expect } from '@playwright/test';
const student_username = process.env.STUDENT_USER;
const student_password = process.env.STUDENT_PASSWORD;
const prof_username = process.env.PROF_USER;
const prof_password = process.env.PROF_PASSWORD;
const admin_username = process.env.ADMIN_USER;
const admin_password = process.env.ADMIN_PASSWORD;

test("Login Page - (Integration Test) Nonexistent User Cannot Login", async ({ page }) => {
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

test("Login Page - (Integration Test) Incorrect Student Cannot Login (Wrong Username)", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill("wrong_username");
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that we are still on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");
});

test("Login Page - (Integration Test) Incorrect Student Cannot Login (Wrong Password)", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill("wrong_password");

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that we are still on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");
});

test("Login Page - (Integration Test) Correct Student Can Login", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Login Page - (Integration Test) Incorrect Instructor Cannot Login (Wrong Username)", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill("wrong_username");
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that we are still on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");
});

test("Login Page - (Integration Test) Incorrect Instructor Cannot Login (Wrong Password)", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill("wrong_password");

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that we are still on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");
});

test("Login Page - (Integration Test) Correct Instructor Can Login", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Login Page - (Integration Test) Incorrect Admin Cannot Login (Wrong Username)", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill("wrong_username");
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that we are still on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");
});

test("Login Page - (Integration Test) Incorrect Admin Cannot Login (Wrong Password)", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill("wrong_password");

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that we are still on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");
});

test("Login Page - (Integration Test) Correct Admin Can Login", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that we are on the admin page
    await expect(page).toHaveURL("http://localhost:3000/admin");
});

test("Login Page - (Unit Test) Student Can Press Logout Button to Logout", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Click logout button
    await page.getByText("Logout").click();

    // Verify that we are on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");
});

test("Login Page - (Unit Test) Instructor Can Press Logout Button to Logout", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Click logout button
    await page.getByText("Logout").click();

    // Verify that we are on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");
});

test("Login Page - (Unit Test) Admin Can Press Logout Button to Logout", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Click logout button
    await page.getByText("Logout").click();

    // Verify that we are on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");
});
