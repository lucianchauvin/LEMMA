// Complete testing for the Home Page

import { test, expect } from '@playwright/test';
const student_username = process.env.STUDENT_USER;
const student_password = process.env.STUDENT_PASSWORD;
const prof_username = process.env.PROF_USER;
const prof_password = process.env.PROF_PASSWORD;
const admin_username = process.env.ADMIN_USER;
const admin_password = process.env.ADMIN_PASSWORD;

// test("Home Page - Can click on calendar sidebar icon", async ({ page }) => {
//     // Navigate to login page
//     await page.goto("http://localhost:3000/login")
      
//     // Fill in input forms
//     await page.getByLabel("username").fill(username);
//     await page.getByLabel("password").fill(password);

//     // Click login button
//     await page.getByText("Login").last().click();
    
//     // Click calendar button
//     await page.getByText("Calendar").click();

//     // Verify that we are on the calendar page
//     await expect(page).toHaveURL("http://localhost:3000/calendar");
// });

// test("Home Page - Can click on admin panel button", async ({ page }) => {
//     // Navigate to login page
//     await page.goto("http://localhost:3000/login")
      
//     // Fill in input forms
//     await page.getByLabel("username").fill(username);
//     await page.getByLabel("password").fill(password);

//     // Click login button
//     await page.getByText("Login").last().click();
    
//     // Click admin panel button
//     await page.getByText("Admin Panel").click();

//     // Verify that we are on the admin page
//     await expect(page).toHaveURL("http://localhost:3000/admin");
// });

// test("Home Page - Can click on LEMMA icon to return to home page", async ({ page }) => {
//     // Navigate to login page
//     await page.goto("http://localhost:3000/login")
      
//     // Fill in input forms
//     await page.getByLabel("username").fill(username);
//     await page.getByLabel("password").fill(password);

//     // Click login button
//     await page.getByText("Login").last().click();
    
//     // Click calendar button
//     await page.getByText("Calendar").click();
//     await expect(page).toHaveURL("http://localhost:3000/calendar");

//     // Click LEMMA icon
//     await page.getByRole('button').first().click();

//     // Verify that we are on the home page
//     await expect(page).toHaveURL("http://localhost:3000");
// });

// test("Home Page - Can click on course card", async ({ page }) => {
//     // Navigate to login page
//     await page.goto("http://localhost:3000/login")
      
//     // Fill in input forms
//     await page.getByLabel("username").fill(username);
//     await page.getByLabel("password").fill(password);

//     // Click login button
//     await page.getByText("Login").last().click();
    
//     // Click the CSCE 222 course
//     await page.getByText("CSCE222").first().click();

//     // Verify that we are on the CSCE 222 page
//     await expect(page).toHaveURL("http://localhost:3000/6baedc0e-72e5-4674-9ab8-e96db38446eb");
// });

// test("Home Page - Can click on course card assignments", async ({ page }) => {
//     // Navigate to login page
//     await page.goto("http://localhost:3000/login")
      
//     // Fill in input forms
//     await page.getByLabel("username").fill(username);
//     await page.getByLabel("password").fill(password);

//     // Click login button
//     await page.getByText("Login").last().click();
    
//     // Click the CSCE 222 course
//     await page.locator("#assignments").first().click();

//     // Verify that we are on the CSCE 222 page
//     await expect(page).toHaveURL("http://localhost:3000/6baedc0e-72e5-4674-9ab8-e96db38446eb");
// });

// test("Home Page - Can click on course card grades", async ({ page }) => {
//     // Navigate to login page
//     await page.goto("http://localhost:3000/login")
      
//     // Fill in input forms
//     await page.getByLabel("username").fill(username);
//     await page.getByLabel("password").fill(password);

//     // Click login button
//     await page.getByText("Login").last().click();
    
//     // Click the CSCE 222 course
//     await page.locator("#grades").first().click();

//     // Verify that we are on the CSCE 222 grades page
//     await expect(page).toHaveURL("http://localhost:3000/6baedc0e-72e5-4674-9ab8-e96db38446eb/grades");
// });

// test("Home Page - Can click on course card statements", async ({ page }) => {
//     // Navigate to login page
//     await page.goto("http://localhost:3000/login")
      
//     // Fill in input forms
//     await page.getByLabel("username").fill(username);
//     await page.getByLabel("password").fill(password);

//     // Click login button
//     await page.getByText("Login").last().click();
    
//     // Click the CSCE 222 course
//     await page.locator("#statements").first().click();

//     // Verify that we are on the CSCE 222 statements page
//     await expect(page).toHaveURL("http://localhost:3000/6baedc0e-72e5-4674-9ab8-e96db38446eb/statements");
// });
