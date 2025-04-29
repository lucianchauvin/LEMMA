// Complete testing for the Course Users Page

import { test, expect } from '@playwright/test';
const student_username = process.env.STUDENT_USER;
const student_password = process.env.STUDENT_PASSWORD;
const prof_username = process.env.PROF_USER;
const prof_password = process.env.PROF_PASSWORD;
const admin_username = process.env.ADMIN_USER;
const admin_password = process.env.ADMIN_PASSWORD;

test("Course Users Page - (System Test) Student Can Navigate to Course Users", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Get url of course assignments page
    const url = page.url();

    // Click users page button
    await page.getByText("Course Users").click();

    // Verify that we are on not on the course assignments page anymore
    await expect(page).not.toHaveURL(url);
});

test("Course Users Page - (System Test) Instructor Can Navigate to Course Users", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Get url of course assignments page
    const url = page.url();

    // Click users page button
    await page.getByText("Course Users").click();

    // Verify that we are on not on the course assignments page anymore
    await expect(page).not.toHaveURL(url);
});

test("Course Users Page - (System Test) Admin Can Navigate to Course Users", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Get url of course assignments page
    const url = page.url();

    // Click users page button
    await page.getByText("Course Users").click();

    // Verify that we are on not on the course assignments page anymore
    await expect(page).not.toHaveURL(url);
});

test("Course Users Page - (System Test) Student Can View Course Users (Only Self and Instructor)", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Get url of course assignments page
    const url = page.url();

    // Click users page button
    await page.getByText("Course Users").click();

    // Verify that student can only view self and instructor
    await expect(page.getByText("Lucian Chauvin")).toBeVisible();
    await expect(page.getByText("Martin Carsile")).toBeVisible();
    await expect(page.getByText("Marvin Fung")).not.toBeVisible();
    await expect(page.getByText("Shiro Kaieda")).not.toBeVisible();
    await expect(page.getByText("Admin")).not.toBeVisible();
});

test("Course Users Page - (System Test) Instructor Can View Course Users (All except Admin)", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Get url of course assignments page
    const url = page.url();

    // Click users page button
    await page.getByText("Course Users").click();

    // Verify that instructor can view all users except Admin
    await expect(page.getByText("Lucian Chauvin")).toBeVisible();
    await expect(page.getByText("Martin Carsile")).toBeVisible();
    await expect(page.getByText("Marvin Fung")).toBeVisible();
    await expect(page.getByText("Shiro Kaieda")).toBeVisible();
    await expect(page.getByText("Admin")).not.toBeVisible();
});

test("Course Users Page - (System Test) Admin Can View Course Users", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Get url of course assignments page
    const url = page.url();

    // Click users page button
    await page.getByText("Course Users").click();

    // Verify that admin can view all users
    await expect(page.getByText("Lucian Chauvin")).toBeVisible();
    await expect(page.getByText("Martin Carsile")).toBeVisible();
    await expect(page.getByText("Marvin Fung")).toBeVisible();
    await expect(page.getByText("Shiro Kaieda")).toBeVisible();
    await expect(page.getByText("Admin").first()).toBeVisible();
});

test("Course Users Page - (Unit Test) Student Can Click on LEMMA Icon to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click users page button
    await page.getByText("Course Users").click();

    // Click LEMMA icon
    await page.getByRole('button').first().click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Course Users Page - (Unit Test) Instructor Can Click on LEMMA Icon to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click users page button
    await page.getByText("Course Users").click();

    // Click LEMMA icon
    await page.getByRole('button').first().click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Course Users Page - (Unit Test) Admin Can Click on LEMMA Icon to Return to Admin Panel Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click users page button
    await page.getByText("Course Users").click();

    // Click LEMMA icon
    await page.getByRole('button').first().click();

    // Verify that we are on the admin panel page
    await expect(page).toHaveURL("http://localhost:3000/admin");
});

test("Course Users Page - (Unit Test) Student Can Click on Home Page Icon in Sidebar to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click users page button
    await page.getByText("Course Users").click();

    // Click home page button
    await page.getByText("Home").click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Course Users Page - (Unit Test) Instructor Can Click on Home Page Icon in Sidebar to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click users page button
    await page.getByText("Course Users").click();

    // Click home page button
    await page.getByText("Home").click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Course Users Page - (Unit Test) Admin Can Click on Home Page Icon in Sidebar to Return to Admin Panel Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click users page button
    await page.getByText("Course Users").click();

    // Click home page button
    await page.getByText("Home").click();

    // Verify that we are on the admin panel page
    await expect(page).toHaveURL("http://localhost:3000/admin");
});
