// Complete testing for the Course Statements Page

import { test, expect } from '@playwright/test';
const student_username = process.env.STUDENT_USER;
const student_password = process.env.STUDENT_PASSWORD;
const prof_username = process.env.PROF_USER;
const prof_password = process.env.PROF_PASSWORD;
const admin_username = process.env.ADMIN_USER;
const admin_password = process.env.ADMIN_PASSWORD;

test("Course Statements Page - (Integration Test) Student Cannot Navigate to Course Statements", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(student_username);
    await page.getByLabel("password").fill(student_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Verify that statements button is not available
    await expect(page.getByText("Course Statements")).not.toBeAttached();
});

test("Course Statements Page - (Integration Test) Instructor Can Navigate to Course Statements", async ({ page }) => {
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

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that we are on not on the course assignments page anymore
    await expect(page).not.toHaveURL(url);
});

test("Course Statements Page - (Integration Test) Admin Can Navigate to Course Statements", async ({ page }) => {
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

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that we are on not on the course assignments page anymore
    await expect(page).not.toHaveURL(url);
});

test("Course Statements Page - (Integration Test) Correct Information is Displayed After Edit and Instructor Can View Course Statements", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the statements are visible
    await expect(page.getByText("rw").first()).toBeVisible();
});

test("Course Statements Page - (Integration Test) Correct Information is Displayed After Edit and Admin Can View Course Statements", async ({ page }) => {
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

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the statements are visible
    await expect(page.getByText("rw").first()).toBeVisible();
});

test("Course Statements Page - (Unit Test) Instructor Adding Statement - Invalid Input for All", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the form validation input works as intended
    await page.getByText("Submit").click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Successfully added statement!")).not.toBeAttached();
});

test("Course Statements Page - (Unit Test) Instructor Adding Statement - Invalid Input for Statement Name", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the form validation input works as intended
    await page.locator("#statement_name").fill("");
    await page.locator("#statement_description").fill("how to do lean 101");
    await page.locator("#statement_category").fill("capstone");
    await page.locator("#statement_file").fill("lean");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Successfully added statement!")).not.toBeAttached();
});

test("Course Statements Page - (Unit Test) Instructor Adding Statement - Invalid Input for Statement Description", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the form validation input works as intended
    await page.locator("#statement_name").fill("lean 101");
    await page.locator("#statement_description").fill("");
    await page.locator("#statement_category").fill("capstone");
    await page.locator("#statement_file").fill("lean");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Successfully added statement!")).not.toBeAttached();
});

test("Course Statements Page - (Unit Test) Instructor Adding Statement - Invalid Input for Statement Category", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the form validation input works as intended
    await page.locator("#statement_name").fill("lean 101");
    await page.locator("#statement_description").fill("how to do lean 101");
    await page.locator("#statement_category").fill("");
    await page.locator("#statement_file").fill("lean");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Successfully added statement!")).not.toBeAttached();
});

test("Course Statements Page - (Unit Test) Instructor Adding Statement - Invalid Input for Statement File", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the form validation input works as intended
    await page.locator("#statement_name").fill("lean 101");
    await page.locator("#statement_description").fill("how to do lean 101");
    await page.locator("#statement_category").fill("capstone");
    await page.locator("#statement_file").fill("");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Successfully added statement!")).not.toBeAttached();
});

test("Course Statements Page - (Unit Test) Instructor Adding Statement - Multiple Invalid Inputs", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the form validation input works as intended
    await page.locator("#statement_name").fill("");
    await page.locator("#statement_description").fill("how to do lean 101");
    await page.locator("#statement_category").fill("");
    await page.locator("#statement_file").fill("lean");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Successfully added statement!")).not.toBeAttached();
});

test("Course Statements Page - (Unit Test) Admin Adding Statement - Invalid Input for All", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the form validation input works as intended
    await page.getByText("Submit").click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Successfully added statement!")).not.toBeAttached();
});

test("Course Statements Page - (Unit Test) Admin Adding Statement - Invalid Input for Statement Name", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the form validation input works as intended
    await page.locator("#statement_name").fill("");
    await page.locator("#statement_description").fill("how to do lean 101");
    await page.locator("#statement_category").fill("capstone");
    await page.locator("#statement_file").fill("lean");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Successfully added statement!")).not.toBeAttached();
});

test("Course Statements Page - (Unit Test) Admin Adding Statement - Invalid Input for Statement Description", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the form validation input works as intended
    await page.locator("#statement_name").fill("lean 101");
    await page.locator("#statement_description").fill("");
    await page.locator("#statement_category").fill("capstone");
    await page.locator("#statement_file").fill("lean");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Successfully added statement!")).not.toBeAttached();
});

test("Course Statements Page - (Unit Test) Admin Adding Statement - Invalid Input for Statement Category", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the form validation input works as intended
    await page.locator("#statement_name").fill("lean 101");
    await page.locator("#statement_description").fill("how to do lean 101");
    await page.locator("#statement_category").fill("");
    await page.locator("#statement_file").fill("lean");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Successfully added statement!")).not.toBeAttached();
});

test("Course Statements Page - (Unit Test) Admin Adding Statement - Invalid Input for Statement File", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the form validation input works as intended
    await page.locator("#statement_name").fill("lean 101");
    await page.locator("#statement_description").fill("how to do lean 101");
    await page.locator("#statement_category").fill("capstone");
    await page.locator("#statement_file").fill("");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Successfully added statement!")).not.toBeAttached();
});

test("Course Statements Page - (Unit Test) Admin Adding Statement - Multiple Invalid Inputs", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the form validation input works as intended
    await page.locator("#statement_name").fill("");
    await page.locator("#statement_description").fill("how to do lean 101");
    await page.locator("#statement_category").fill("");
    await page.locator("#statement_file").fill("lean");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Successfully added statement!")).not.toBeAttached();
});

test("Course Statements Page - (Unit Test) Instructor Can Click on LEMMA Icon to Return to Home Page", async ({ page }) => {
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
    await page.getByText("Course Statements").click();

    // Click LEMMA icon
    await page.getByRole('button').first().click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Course Statements Page - (Unit Test) Admin Can Click on LEMMA Icon to Return to Admin Panel Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Click LEMMA icon
    await page.getByRole('button').first().click();

    // Verify that we are on the admin panel page
    await expect(page).toHaveURL("http://localhost:3000/admin");
});


test("Course Statements Page - (Unit Test) Instructor Can Click on Home Page Icon in Sidebar to Return to Home Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Click home page button
    await page.getByText("Home").click();

    // Verify that we are on the home page
    await expect(page).toHaveURL("http://localhost:3000");
});

test("Course Statements Page - (Unit Test) Admin Can Click on Home Page Icon in Sidebar to Return to Admin Panel Page", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Click home page button
    await page.getByText("Home").click();

    // Verify that we are on the admin panel page
    await expect(page).toHaveURL("http://localhost:3000/admin");
});

test("Course Statements Page - (System Test) Instructor System Test for Adding Statements", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(prof_username);
    await page.getByLabel("password").fill(prof_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the first course
    await page.locator("#assignments").first().click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the new statements are not visible
    await expect(page.getByText("lean 101").first()).not.toBeVisible();

    // Create course statement and verify it exists
    await page.locator("#statement_name").fill("lean 101");
    await page.locator("#statement_description").fill("how to do lean 101");
    await page.locator("#statement_category").fill("capstone");
    await page.locator("#statement_file").fill("lean");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Failed to add")).not.toBeAttached();
});

test("Course Statements Page - (System Test) Admin System Test for Adding Statements", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")
      
    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);

    // Click login button
    await page.getByText("Login").last().click();
    
    // Click the CSCE 222 course
    await page.getByText("CSCE222").click();

    // Click statements page button
    await page.getByText("Course Statements").click();

    // Verify that the new statements are not visible
    await expect(page.getByText("lean 102").first()).not.toBeVisible();

    // Create course statement and verify it exists
    await page.locator("#statement_name").fill("lean 102");
    await page.locator("#statement_description").fill("how to do lean 102");
    await page.locator("#statement_category").fill("capstone capstone");
    await page.locator("#statement_file").fill("lean");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Failed to add")).not.toBeAttached();
});

