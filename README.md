# sikshyalaya

Smart Schooling Solution

## Project Phases and Features

### Phase 1: Core Functionality

- [ ] User Authentication and Authorization
  - [x] Register
    - [x] ROLE: ADMIN, Teacher, Student  (fields: email, phoneNumber, password, role, fullName, fatherName, motherName)
    - [x] PASSWORD ENCRYPTION
    - [x] Register API
    - [x] Register Form

  - [ ] Login
    - [ ] email based multi user login
    - [x] PASSWORD VERIFICATION
    - [x] Login API
    - [x] Login Form
    - [x] Generate Token (JWT)
- [ ] Admin Panel
  - [x] Teacher and Student login approval via Admin 
  - [ ] Add different courses and class and schedules, and section and classteacher for the section
- [ ] Teacher Panel
  - [ ] Teacher can add course content for the subject he is assigned.
  - [ ] Create multiple topics based on table of contents, and add multiple segments/info to the topics
- [ ] Student Panel
  - [ ] Can search/view courses-topics/ info of the topics

### Phase 2: Academic Features

- [x] Grade Book and Report Card Generation
- [ ] Assignment Submission and Grading
- [ ] Exam Schedule Management
- [ ] Library Management System

### Phase 3: Communication and Collaboration

- [x] Announcements and Notifications
- [ ] Parent-Teacher Communication Portal
- [ ] Discussion Forums for Students and Teachers
- [ ] Event Calendar

### Phase 4: Administrative Tools

- [ ] Timetable Generation
- [ ] Fee Management
- [ ] Inventory Management for School Supplies
- [ ] Staff Payroll System

### Phase 5: Advanced Features

- [ ] Online Learning Management System (LMS) Integration
- [ ] Student Performance Analytics
- [ ] Alumni Network and Management

## Getting Started

To get started with the School Management System, follow these steps:

1. Clone the repository
2. Install dependencies for both client and server:

```
cd client 
npm install
npm run dev

cd server
npm install
npm run dev
```

Both the client and server can be started using the `npm run dev` command in their respective directories.

## Technologies and Packages Used

### Client-side (Next.js)

- Next.js: React framework for building web applications
- React: JavaScript library for building user interfaces
- @nextui-org/react: UI component library for React
- Radix UI: Unstyled, accessible components for React
- Formik: Form library for React
- Yup: JavaScript schema validation library
- Recharts: Composable charting library for React
- Framer Motion: Animation library for React
- Tailwind CSS: Utility-first CSS framework

### Development Tools

- ESLint: JavaScript linting tool
- PostCSS: CSS transformation tool
- Tailwind CSS: Utility-first CSS framework

## Contributing

We welcome contributions to the School Management System! Please read our `CONTRIBUTING.md` file for guidelines on how to submit issues, feature requests, and pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

## Contact

For any queries or support, please contact our team at support@schoolmanagementsystem.com



