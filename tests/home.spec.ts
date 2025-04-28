// Complete testing for the Home Page

import { test, expect } from '@playwright/test';
const student_username = process.env.STUDENT_USER;
const student_password = process.env.STUDENT_PASSWORD;
const prof_username = process.env.PROF_USER;
const prof_password = process.env.PROF_PASSWORD;

test("Home Page - Student Can click on Course Card", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").first().click();

    // Verify that we are on the CSCE 222 page
    await expect(page).toHaveURL("http://localhost:3000/e8ce0fe7-d982-441b-80fb-7e0bc67adb4b");
});

test("Home Page - Instructor Can click on Course Card", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").first().click();

    // Verify that we are on the CSCE 222 page
    await expect(page).toHaveURL("http://localhost:3000/e8ce0fe7-d982-441b-80fb-7e0bc67adb4b");
});

test("Home Page - Student Can Click on Course Card Assignments", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Verify that we are on not on the home page anymore
    await expect(page).not.toHaveURL("http://localhost:3000");
});

test("Home Page - Instructor Can Click on Course Card Assignments", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Verify that we are not on the home page anymore
    await expect(page).not.toHaveURL("http://localhost:3000");
});

test("Home Page - Student Can Click on Course Card Grades", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#grades").first().click();

    // Verify that we are not on the home page anymore
    await expect(page).not.toHaveURL("http://localhost:3000");
});

test("Home Page - Instructor Can Click on Course Card Grades", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#grades").first().click();

    // Verify that we are not on the home page anymore
    await expect(page).not.toHaveURL("http://localhost:3000");
});

test("Home Page - Student Cannot See Course Card Statements", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Verify that the course statements icon is not there
    await expect(page.locator("#statements")).not.toBeAttached();
});

test("Home Page - Instructors Can Click on Course Card Statements", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#statements").first().click();

    // Verify that we are not on the home page anymore
    await expect(page).not.toHaveURL("http://localhost:3000");
});
