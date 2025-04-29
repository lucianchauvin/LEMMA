// Complete testing for the Calendar Page

import { test, expect } from '@playwright/test';
const student_username = process.env.STUDENT_USER;
const student_password = process.env.STUDENT_PASSWORD;
const prof_username = process.env.PROF_USER;
const prof_password = process.env.PROF_PASSWORD;
const admin_username = process.env.ADMIN_USER;
const admin_password = process.env.ADMIN_PASSWORD;

test("Calendar Page - Student Can Click on Calendar Icon In Sidebar", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click calendar button
    await page.getByText("Calendar").click();

    // Verify that we are on the calendar page
    await expect(page).toHaveURL("http://localhost:3000/calendar");
});

test("Calendar Page - Instructor Can Click on Calendar Icon In Sidebar", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click calendar button
    await page.getByText("Calendar").click();

    // Verify that we are on the calendar page
    await expect(page).toHaveURL("http://localhost:3000/calendar");
});

test("Calendar Page - Admin Can Click on Calendar Icon In Sidebar", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click calendar button
    await page.getByText("Calendar").click();

    // Verify that we are on the calendar page
    await expect(page).toHaveURL("http://localhost:3000/calendar");
});

test("Calendar Page - Student Can Click on LEMMA Icon to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click calendar button
    await page.getByText("Calendar").click();

    // Click LEMMA icon
    await page.getByRole('button').first().click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Calendar Page - Instructor Can Click on LEMMA Icon to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click calendar button
    await page.getByText("Calendar").click();

    // Click LEMMA icon
    await page.getByRole('button').first().click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});
test("Calendar Page - Admin Can Click on LEMMA Icon to Return to Admin Panel Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click calendar button
    await page.getByText("Calendar").click();

    // Click LEMMA icon
    await page.getByRole('button').first().click();

    // Verify that we are on the admin panel page
    await expect(page).toHaveURL("http://localhost:3000/admin");
});

test("Calendar Page - Student Can Click on Home Page Icon in Sidebar to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Click calendar button
    await page.getByText("Calendar").click();

    // Click home page button
    await page.getByText("Home").click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Calendar Page - Instructor Can Click on Home Page Icon in Sidebar to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click calendar button
    await page.getByText("Calendar").click();

    // Click home page button
    await page.getByText("Home").click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Calendar Page - Admin Can Click on Home Page Icon in Sidebar to Return to Admin Panel Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();

    // Click calendar button
    await page.getByText("Calendar").click();

    // Click home page button
    await page.getByText("Home").click();

    // Verify that we are on the admin panel page
    await expect(page).toHaveURL("http://localhost:3000/admin");
});

test("Calendar Page - Student Can View Assignments in Calendar", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click calendar button
    await page.getByText("Calendar").click();

    // Verify that assignments can be seen
    await expect(page.getByText("Predicate Logic and Quantifiers").or(page.getByText("Basics of LEAN")).first()).toBeVisible();
});

test("Calendar Page - Instructor Can View Assignments in Calendar", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click calendar button
    await page.getByText("Calendar").click();

    // Verify that assignments can be seen
    await expect(page.getByText("Predicate Logic and Quantifiers").or(page.getByText("Basics of LEAN")).first()).toBeVisible();
});

test("Calendar Page - Admin Can View Assignments in Calendar", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click calendar button
    await page.getByText("Calendar").click();

    // Verify that assignments can be seen
    await expect(page.getByText("Predicate Logic and Quantifiers").or(page.getByText("Basics of LEAN")).first()).toBeVisible();
});
