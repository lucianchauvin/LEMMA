// Complete testing for the Course Assignments Page

import { test, expect } from '@playwright/test';
const student_username = process.env.STUDENT_USER;
const student_password = process.env.STUDENT_PASSWORD;
const prof_username = process.env.PROF_USER;
const prof_password = process.env.PROF_PASSWORD;
const admin_username = process.env.ADMIN_USER;
const admin_password = process.env.ADMIN_PASSWORD;

test("Course Assignments Page - Student Can Navigate to Course Assignments", async ({ page }) => {
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

test("Course Assignments Page - Instructor Can Navigate to Course Assignments", async ({ page }) => {
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

test("Course Assignments Page - Admin Can Navigate to Course Assignments", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Verify that we are not on the admin panel page anymore
    await expect(page).not.toHaveURL("http://localhost:3000/admin");
});

test("Course Assignments Page - Student Can Click on LEMMA Icon to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click LEMMA icon
    await page.getByRole('button').first().click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Course Assignments Page - Instructor Can Click on LEMMA Icon to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click LEMMA icon
    await page.getByRole('button').first().click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Course Assignments Page - Admin Can Click on LEMMA Icon to Return to Admin Panel Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click LEMMA icon
    await page.getByRole('button').first().click();

    // Verify that we are on the admin panel page
    await expect(page).toHaveURL("http://localhost:3000/admin");
});

test("Course Assignments Page - Student Can Click on Home Page Icon in Sidebar to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click home page button
    await page.getByText("Home").click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Course Assignments Page - Instructor Can Click on Home Page Icon in Sidebar to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click home page button
    await page.getByText("Home").click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Course Assignments Page - Admin Can Click on Home Page Icon in Sidebar to Return to Admin Panel Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click home page button
    await page.getByText("Home").click();

    // Verify that we are on the admin panel page
    await expect(page).toHaveURL("http://localhost:3000/admin");
});
