// Complete testing for the Course Gradebook Page

import { test, expect } from '@playwright/test';
const student_username = process.env.STUDENT_USER;
const student_password = process.env.STUDENT_PASSWORD;
const prof_username = process.env.PROF_USER;
const prof_password = process.env.PROF_PASSWORD;
const admin_username = process.env.ADMIN_USER;
const admin_password = process.env.ADMIN_PASSWORD;

test("Course Gradebook Page - (Integration Test) Student Cannot Navigate to Course Gradebook (they use Course Grades instead)", async ({ page }) => {
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

    // Verify that gradebook button is not available
    await expect(page.getByText("Course Gradebook")).not.toBeAttached();
});

test("Course Gradebook Page - (Integration Test) Instructor Can Navigate to Course Gradebook", async ({ page }) => {
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

    // Click gradebook page button
    await page.getByText("Course Gradebook").click();

    // Verify that we are on not on the course assignments page anymore
    await expect(page).not.toHaveURL(url);
});

test("Course Gradebook Page - (Integration Test) Admin Can Navigate to Course Gradebook", async ({ page }) => {
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

    // Click gradebook page button
    await page.getByText("Course Gradebook").click();

    // Verify that we are on not on the course assignments page anymore
    await expect(page).not.toHaveURL(url);
});

test("Course Gradebook Page - (Integration Test) Information is Displayed and Instructor Can View Course Gradebook", async ({ page }) => {
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

    // Click gradebook page button
    await page.getByText("Course Gradebook").click();

    // Verify that assignments can be seen
    await expect(page.getByText("Predicate Logic and Quantifiers").or(page.getByText("Basics of LEAN")).first()).toBeVisible();
});

test("Course Gradebook Page - (Integration Test) Information is Displayed and Admin Can View Course Gradebook", async ({ page }) => {
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

    // Click gradebook page button
    await page.getByText("Course Gradebook").click();

    // Verify that assignments can be seen
    await expect(page.getByText("Predicate Logic and Quantifiers").or(page.getByText("Basics of LEAN")).first()).toBeVisible();
});

test("Course Gradebook Page - (Unit Test) Instructor Can Click on LEMMA Icon to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click gradebook page button
    await page.getByText("Course Gradebook").click();

    // Click LEMMA icon
    await page.getByRole('button').first().click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Course Gradebook Page - (Unit Test) Admin Can Click on LEMMA Icon to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click gradebook page button
    await page.getByText("Course Gradebook").click();

    // Click LEMMA icon
    await page.getByRole('button').first().click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000/admin");
});

test("Course Gradebook Page - (Unit Test) Instructor Can Click on Home Page Icon in Sidebar to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click gradebook page button
    await page.getByText("Course Gradebook").click();

    // Click home page button
    await page.getByText("Home").click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Course Gradebook Page - (Unit Test) Admin Can Click on Home Page Icon in Sidebar to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click gradebook page button
    await page.getByText("Course Gradebook").click();

    // Click home page button
    await page.getByText("Home").click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000/admin");
});
