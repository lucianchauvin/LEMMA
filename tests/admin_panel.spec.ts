// Complete testing for the Admin Panel Page

import { test, expect } from '@playwright/test';
const student_username = process.env.STUDENT_USER;
const student_password = process.env.STUDENT_PASSWORD;
const prof_username = process.env.PROF_USER;
const prof_password = process.env.PROF_PASSWORD;
const admin_username = process.env.ADMIN_USER;
const admin_password = process.env.ADMIN_PASSWORD;

test("Admin Panel Page - (System Test) Student Cannot Access Admin Panel Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Navigate to Admin Panel page
    const response = await page.goto("http://localhost:3000/admin");

    // Verify that nothing shows up
    await expect(page.getByText("Add Users")).not.toBeVisible();
});

test("Admin Panel Page - (System Test) Instructor Cannot Access Admin Panel Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Navigate to Admin Panel page
    const response = await page.goto("http://localhost:3000/admin");

    // Verify that nothing shows up
    await expect(page.getByText("Add Users")).not.toBeVisible();
});

test("Admin Panel Page - (System Test) Admin Can See Users", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that users appear
    await expect(page.getByText("Martin Carsile")).toBeVisible();
});

test("Admin Panel Page - (System Test) Admin Can See Courses", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Verify that courses appear
    await expect(page.getByText("MATH409")).toBeVisible();
});
