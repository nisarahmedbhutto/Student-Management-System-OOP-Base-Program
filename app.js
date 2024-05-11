#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// student data class 
class StudentData {
    static counter = 10000;
    studentId;
    studentName;
    courses;
    studentBalance;
    feesPaid;
    constructor(name, courses) {
        this.studentName = name;
        this.studentId = ++StudentData.counter;
        this.courses = courses;
        this.studentBalance = 20000;
        this.feesPaid = 0;
    }
}
// Function to add a new student
async function addNewStudent(students) {
    let studentData = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: chalk.blueBright.bold("Enter Student Name...!"),
        },
        {
            name: "courses",
            type: "list",
            message: chalk.greenBright.bold("Please Select Courses...!"),
            choices: ["TypeScript", "Python", "Java", "PHP"],
        },
    ]);
    console.log(chalk.blueBright.bold(`Student Name Is "${studentData.name}" ::: Selected Course "${studentData.courses}"`));
    const newStudent = new StudentData(studentData.name, studentData.courses);
    students.set(newStudent.studentId, newStudent);
    return { students };
}
// Function to check student balance
async function checkBalance(students) {
    let studentIdResponse = await inquirer.prompt({
        name: "studentId",
        type: "input",
        message: chalk.bgBlueBright.bold(`Enter Student ID to check balance...! (${StudentData.counter})`),
    });
    let student = students.get(parseInt(studentIdResponse.studentId));
    if (student) {
        console.log(chalk.blueBright.bold(`Balance for Student ${student.studentBalance}:  Student ID : ${student.studentId}`));
    }
    else {
        console.log(chalk.redBright.bold("Invalid Student ID!"));
    }
}
// Function to pay student fees
async function payFees(students) {
    let studentIdResponse = await inquirer.prompt({
        name: "studentId",
        type: "input",
        message: chalk.bgBlueBright.bold(`Enter Student ID to pay fees...! (${StudentData.counter}`),
    });
    let student = students.get(parseInt(studentIdResponse.studentId));
    if (student) {
        let studentData = await inquirer.prompt([
            {
                name: "payFees",
                type: "number",
                message: chalk.greenBright.bold("Enter Student Fees...!"),
            },
        ]);
        if (studentData.payFees > student.studentBalance) {
            console.log(chalk.redBright.bold("Insufficient balance!"));
        }
        else {
            student.studentBalance -= studentData.payFees;
            student.feesPaid += studentData.payFees;
            console.log(chalk.blueBright.bold(`Payment of ${studentData.payFees} made for Student ID ${student.studentId}. Updated balance is ${student.studentBalance}`));
        }
    }
    else {
        console.log(chalk.redBright.bold("Invalid Student ID!"));
    }
}
// Function to view all students
async function showAllData(students) {
    students.forEach((student) => {
        console.log(chalk.bgBlueBright.bold.italic("--------------Student Managment System Nisar Ahmed Bhutto------------------------"));
        console.log(chalk.blueBright.bold(`Student ID: ${student.studentId}`));
        console.log(chalk.greenBright.bold(`Student Name: ${student.studentName}`));
        console.log(chalk.blueBright.bold(`Courses: ${student.courses}`));
        console.log(chalk.greenBright.bold(`Fees Paid: ${student.feesPaid}`));
        console.log(chalk.blueBright.bold(`Balance: ${student.studentBalance}`));
        console.log(chalk.yellowBright.bold("-----------------------------------"));
    });
}
// Main function to manage student options
async function manageStudents() {
    let studentInfo = { students: new Map() };
    console.log(chalk.bgBlueBright.bold.italic("--------------Student Managment System Nisar Ahmed Bhutto------------------------"));
    while (true) {
        let studentManagementSystem = await inquirer.prompt({
            name: "options",
            type: "list",
            message: chalk.bgRedBright.bold("Please select one option."),
            choices: [
                "Add New Student",
                "Check Balance",
                "Pay Fees",
                "Show All Data",
                "Exit",
            ],
        });
        switch (studentManagementSystem.options) {
            case "Add New Student":
                studentInfo = await addNewStudent(studentInfo.students);
                break;
            case "Check Balance":
                await checkBalance(studentInfo.students);
                break;
            case "Pay Fees":
                await payFees(studentInfo.students);
                break;
            case "Show All Data":
                await showAllData(studentInfo.students);
                break;
            case "Exit":
                console.log("Exiting...");
                return;
            default:
                console.log(chalk.redBright.bold("Invalid option. Exiting..."));
                return;
        }
    }
}
// Run the main function
manageStudents();
