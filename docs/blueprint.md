# **App Name**: CounselEase

## Core Features:

- Manual Student Data Entry: Allows admin users to manually input student data, including NIS, Name, Class, Major, Address, Phone Number, and Parent information, ensuring all required fields are completed before submission.
- Student Data Import: Enables admin users to import student data in bulk from a standardized Excel template (.xlsx), validating data integrity, checking data for potential problems, and handling errors before creating or updating records in the tbl_siswa table.
- Student Data Export: Enables admin users to export student data into a standardized Excel template (.xlsx) for record-keeping or external use.
- Student Search: Enables users to search student data via multiple fields.
- Case Creation: Allows teachers (guru_bk) to record new BK cases tied to particular students and user id. The system ensures a student must be selected prior to case creation. Generates a unique code_kasus, records anamnesa (initial assessment), allows for up to 4 treatments or counselling, with date for each session. The system links the user ID (guru_bk) currently logged in, logging which staff member created the event.
- Report Generation: Enables the system to collate records and provide insights like number of cases, types of cases, teacher handling cases. System produces PDF downloads for use in other programs.
- Role-Based User Login: Secure user login system with role-based authentication (admin, guru_bk, wali_kelas).  Hashed passwords ensure security. Each new case entry records the user ID (guru_bk) who created it, logging who handled each case.

## Style Guidelines:

- Primary color: Soft blue (#77B5FE) to promote a sense of calmness and trust. It reflects reliability and encourages open communication, essential in a counseling environment.
- Background color: Light blue (#EAF2FF), very similar hue as the primary color but heavily desaturated, for a calm, unobtrusive background.
- Accent color: Muted teal (#4DB6AC), analogous to the blue but distinct enough to highlight key interactive elements, like buttons or active menu items, indicating action without disrupting the overall soothing atmosphere.
- Body and headline font: 'PT Sans', a humanist sans-serif font, strikes a balance between modern design and approachability, enhancing readability and user comfort in reports, forms and dashboards.
- Use consistent, outline-style icons to represent different sections (students, cases, reports), keeping the interface clean and intuitive.
- Employs a clean, modern layout with sufficient whitespace to prevent clutter and enhance focus on critical information. Prioritizes logical arrangement and intuitive navigation, ensuring ease of use for all roles—admin, counselors, and teachers.
- Subtle transitions and feedback animations (e.g., on form submission) provide gentle cues without being distracting, confirming actions and maintaining a smooth, user-friendly experience.