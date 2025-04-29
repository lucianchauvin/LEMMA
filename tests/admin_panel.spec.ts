// Complete testing for the Admin Panel Page + System Testing

import { test, expect } from '@playwright/test';
const student_username = process.env.STUDENT_USER;
const student_password = process.env.STUDENT_PASSWORD;
const prof_username = process.env.PROF_USER;
const prof_password = process.env.PROF_PASSWORD;
const admin_username = process.env.ADMIN_USER;
const admin_password = process.env.ADMIN_PASSWORD;

test("Admin Panel Page - (Integration Test) Student Cannot Access Admin Panel Page", async ({ page }) => {
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

test("Admin Panel Page - (Integration Test) Instructor Cannot Access Admin Panel Page", async ({ page }) => {
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

test("Admin Panel Page - (Integration Test) Admin Can See Users", async ({ page }) => {
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

test("Admin Panel Page - (Integration Test) Admin Can See Courses", async ({ page }) => {
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

test("Admin Panel - (Unit Test) Adding User - Invalid Input for All", async ({ page, browserName }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")

    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);

    // Verify that the form validation input works as intended
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("User added successfully!")).not.toBeAttached();
});

test("Admin Panel - (Unit Test) Adding User - Invalid Input for Username", async ({ page, browserName }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")

    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);

    // Verify that the form validation input works as intended
    await page.locator("#username").fill("");
    await page.locator("#password").fill("test_student");
    await page.locator("#first_name").fill("test_student");
    await page.locator("#last_name").fill("test_student");
    await page.locator("#email").fill("test_student@gmail.com");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("User added successfully!")).not.toBeAttached();
});

test("Admin Panel - (Unit Test) Adding User - Invalid Input for Password (No Password)", async ({ page, browserName }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")

    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);

    // Verify that the form validation input works as intended
    await page.locator("#username").fill("test_student");
    await page.locator("#password").fill("");
    await page.locator("#first_name").fill("test_student");
    await page.locator("#last_name").fill("test_student");
    await page.locator("#email").fill("test_student@gmail.com");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("User added successfully!")).not.toBeAttached();
});

test("Admin Panel - (Unit Test) Adding User - Invalid Input for Password (Password too short)", async ({ page, browserName }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")

    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);

    // Verify that the form validation input works as intended
    await page.locator("#username").fill("test_student");
    await page.locator("#password").fill("a");
    await page.locator("#first_name").fill("test_student");
    await page.locator("#last_name").fill("test_student");
    await page.locator("#email").fill("test_student@gmail.com");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("User added successfully!")).not.toBeAttached();
});

test("Admin Panel - (Unit Test) Adding User - Invalid Input for Password (Password too long)", async ({ page, browserName }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")

    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);

    // Verify that the form validation input works as intended
    await page.locator("#username").fill("test_student");
    await page.locator("#password").fill("askhgfljksdebgfvjlksrdbgfjvlkcsdbgfvkjsared,bgfvkjdszb,fckjdaznbgfvkjsfdzbngvkjsrfbgvkjsadbFDKCJsd,bFCKjdAZBFCkjmnsd,ZBFkcjsdz,bgfvkjfdszmb,gvkjsf,bzngvkj,fdbnfvkj,sfbgjkhvsbdfjvhbsfdkjgvbsfkdjgvbskdhfbcksdjhgfbhcewsakujhfbiuweakjshdbfckrejwshafocsukirhgviusdrfgbhgoukhsraeoiadfrlhqwaoilhrfukserdjghbksfjbgkjdvf");
    await page.locator("#first_name").fill("test_student");
    await page.locator("#last_name").fill("test_student");
    await page.locator("#email").fill("test_student@gmail.com");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("User added successfully!")).not.toBeAttached();
});

test("Admin Panel - (Unit Test) Adding User - Invalid Input for First Name", async ({ page, browserName }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")

    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);

    // Verify that the form validation input works as intended
    await page.locator("#username").fill("test_student");
    await page.locator("#password").fill("test_student");
    await page.locator("#first_name").fill("");
    await page.locator("#last_name").fill("test_student");
    await page.locator("#email").fill("test_student@gmail.com");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("User added successfully!")).not.toBeAttached();
});

test("Admin Panel - (Unit Test) Adding User - Invalid Input for Last Name", async ({ page, browserName }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")

    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);

    // Verify that the form validation input works as intended
    await page.locator("#username").fill("test_student");
    await page.locator("#password").fill("test_student");
    await page.locator("#first_name").fill("test_student");
    await page.locator("#last_name").fill("");
    await page.locator("#email").fill("test_student@gmail.com");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("User added successfully!")).not.toBeAttached();
});

test("Admin Panel - (Unit Test) Adding User - Invalid Input for Email (No Email)", async ({ page, browserName }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")

    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);

    // Verify that the form validation input works as intended
    await page.locator("#username").fill("test_student");
    await page.locator("#password").fill("test_student");
    await page.locator("#first_name").fill("test_student");
    await page.locator("#last_name").fill("test_student");
    await page.locator("#email").fill("");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("User added successfully!")).not.toBeAttached();
});

test("Admin Panel - (Unit Test) Adding User - Invalid Input for Email (Email Domain Not Provided)", async ({ page, browserName }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")

    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);

    // Verify that the form validation input works as intended
    await page.locator("#username").fill("test_student");
    await page.locator("#password").fill("test_student");
    await page.locator("#first_name").fill("test_student");
    await page.locator("#last_name").fill("test_student");
    await page.locator("#email").fill("test_student");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("User added successfully!")).not.toBeAttached();
});

test("Admin Panel - (Unit Test) Adding User - Multiple Invalid Inputs", async ({ page, browserName }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")

    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);

    // Verify that the form validation input works as intended
    await page.locator("#username").fill("test_student");
    await page.locator("#password").fill("test_student");
    await page.locator("#first_name").fill("");
    await page.locator("#last_name").fill("");
    await page.locator("#email").fill("");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("User added successfully!")).not.toBeAttached();
});

test("Admin Panel - (Unit Test) Adding Course - Invalid Input for All", async ({ page, browserName }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")

    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);

    // Verify that the form validation input works as intended
    await page.locator("#course_number").fill("");
    await page.locator("#course_name").fill("");
    await page.getByText("Submit").nth(1).click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Course added successfully!")).not.toBeAttached();
});

test("Admin Panel - (Unit Test) Adding Course - Invalid Input for Course Number", async ({ page, browserName }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")

    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);

    // Verify that the form validation input works as intended
    await page.locator("#course_number").fill("");
    await page.locator("#course_name").fill("course_name");
    await page.getByText("Submit").nth(1).click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Course added successfully!")).not.toBeAttached();
});

test("Admin Panel - (Unit Test) Adding Course - Invalid Input for Course Name", async ({ page, browserName }) => {
    // Navigate to login page
    await page.goto("http://localhost:3000/login")

    // Fill in input forms
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);

    // Verify that the form validation input works as intended
    await page.locator("#course_number").fill("course_number");
    await page.locator("#course_name").fill("");
    await page.getByText("Submit").nth(1).click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Course added successfully!")).not.toBeAttached();
});


test("Admin Panel - (System Test) System Test for Adding Multiple Types of Users", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Only running one browser to avoid race conditions in database!")
    // Verify that the test users "test_student", "test_prof", and "test_admin" do not exist yet
    await page.goto("http://localhost:3000/login")
    await page.getByLabel("username").fill("test_student");
    await page.getByLabel("password").fill("test_student");
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL("http://localhost:3000/login");
    await page.getByLabel("username").fill("test_prof");
    await page.getByLabel("password").fill("test_prof");
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL("http://localhost:3000/login");
    await page.getByLabel("username").fill("test_admin");
    await page.getByLabel("password").fill("test_admin");
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL("http://localhost:3000/login");

    // Log in as admin and create the users
    await page.getByLabel("username").fill(admin_username);
    await page.getByLabel("password").fill(admin_password);
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);
    await page.locator("#username").fill("test_student");
    await page.locator("#password").fill("test_student");
    await page.locator("#first_name").fill("test_student");
    await page.locator("#last_name").fill("test_student");
    await page.locator("#email").fill("test_student@gmail.com");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("User added successfully!")).toBeVisible();
    await page.locator("#username").fill("test_prof");
    await page.locator("#password").fill("test_prof");
    await page.locator("#first_name").fill("test_prof");
    await page.locator("#last_name").fill("test_prof");
    await page.locator("#email").fill("test_prof@gmail.com");
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("User added successfully!")).toBeVisible();
    await page.locator("#username").fill("test_admin");
    await page.locator("#password").fill("test_admin");
    await page.locator("#first_name").fill("test_admin");
    await page.locator("#last_name").fill("test_admin");
    await page.locator("#email").fill("test_admin@gmail.com");
    await page.locator("#is_admin")
    await page.getByText("Submit").first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("User added successfully!")).toBeVisible();
    await page.getByText("Logout").click();
    await page.waitForTimeout(5000);

    // Log in as the new users and verify that they have been created
    await page.getByLabel("username").fill("test_student");
    await page.getByLabel("password").fill("test_student");
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);
    await expect(page).not.toHaveURL("http://localhost:3000/login");
    await page.getByText("Logout").click();
    await page.waitForTimeout(5000);
    await page.getByLabel("username").fill("test_prof");
    await page.getByLabel("password").fill("test_prof");
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);
    await expect(page).not.toHaveURL("http://localhost:3000/login");
    await page.getByText("Logout").click();
    await page.waitForTimeout(5000);
    await page.getByLabel("username").fill("test_admin");
    await page.getByLabel("password").fill("test_admin");
    await page.getByText("Login").last().click();
    await page.waitForTimeout(5000);
    await expect(page).not.toHaveURL("http://localhost:3000/login");
    await page.getByText("Logout").click();
});
