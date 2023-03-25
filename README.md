Learnify - A Customizable Learning Management System
Learnify is a Learning Management System built with Laravel, Inertia, React, and Tailwind CSS. This system was created to provide an easily customizable LMS that is suitable for a variety of educational institutions.

Functionality
Courses
Teachers/Admins can create courses with a title and some content (WYSIWYG)
Courses can be viewed by students from chosen classes
Modules
Each course can have a number of modules.
Each module has a title and some content (WYSIWYG)
Modules can be viewed by students from chosen classes
Lessons
Each module can have a number of lessons
Each lesson has a title and some content (WYSIWYG)
Lessons can be viewed by students from chosen classes
Users
Students can create their own accounts
Teachers/Admins can create other users (Teachers/Admins or Students)
Teachers/Admins can assign users to courses
Teachers/Admins can remove users from courses
Teachers/Admins can view a user's details
Students can view their assigned courses on a My Courses page
Students can only view the courses/modules/lessons they are assigned to
Technologies Used
Laravel
Inertia
React
Tailwind CSS
Installation and Setup
Clone the repository
Install the dependencies using composer install and npm install
Create a .env file by copying the .env.example file and updating it with your database credentials
Run the migrations using php artisan migrate
Start the development server using php artisan serve and npm run dev
Contribution Guidelines
If you want to contribute to Learnify, please follow these guidelines:

Fork the repository
Create a new branch with your changes
Submit a pull request with a detailed description of your changes
Credits
Learnify was inspired by Ghost, and was created by simou and [ahmed/abdell].
