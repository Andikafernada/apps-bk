export const students = [
  { id: '1', name: 'Ahmad Dahlan', nis: '12345', class: 'XII-A', major: 'Science', avatarId: 'student-avatar-1' },
  { id: '2', name: 'Budi Santoso', nis: '12346', class: 'XII-B', major: 'Social', avatarId: 'student-avatar-2' },
  { id: '3', name: 'Citra Lestari', nis: '12347', class: 'XI-A', major: 'Science', avatarId: 'student-avatar-3' },
  { id: '4', name: 'Dewi Anggraini', nis: '12348', class: 'X-C', major: 'Language', avatarId: 'student-avatar-4' },
  { id: '5', name: 'Eko Prasetyo', nis: '12349', class: 'XII-C', major: 'Social', avatarId: 'student-avatar-5' },
  { id: '6', name: 'Fitriani', nis: '12350', class: 'XI-B', major: 'Science', avatarId: 'student-avatar-6' },
  { id: '7', name: 'Gilang Ramadhan', nis: '12351', class: 'X-A', major: 'Social', avatarId: 'student-avatar-7' },
];

export const cases = [
  { id: 'c1', studentName: 'Ahmad Dahlan', studentAvatarId: 'student-avatar-1', caseType: 'Academic', status: 'Active', counselorName: 'Dr. Ina', lastMeeting: '2024-05-10' },
  { id: 'c2', studentName: 'Budi Santoso', studentAvatarId: 'student-avatar-2', caseType: 'Personal', status: 'Active', counselorName: 'Mr. Budi', lastMeeting: '2024-05-12' },
  { id: 'c3', studentName: 'Citra Lestari', studentAvatarId: 'student-avatar-3', caseType: 'Career', status: 'Closed', counselorName: 'Dr. Ina', lastMeeting: '2024-04-20' },
  { id: 'c4', studentName: 'Ahmad Dahlan', studentAvatarId: 'student-avatar-1', caseType: 'Social', status: 'Closed', counselorName: 'Mr. Budi', lastMeeting: '2024-03-15' },
  { id: 'c5', studentName: 'Eko Prasetyo', studentAvatarId: 'student-avatar-5', caseType: 'Academic', status: 'Active', counselorName: 'Dr. Ina', lastMeeting: '2024-05-11' },
  { id: 'c6', studentName: 'Fitriani', studentAvatarId: 'student-avatar-6', caseType: 'Personal', status: 'Active', counselorName: 'Mrs. Ani', lastMeeting: '2024-05-13' },
];

export const users = [
    { id: 'u1', name: 'Dr. Ina', role: 'guru_bk', avatarId: 'user-avatar-1'},
    { id: 'u2', name: 'Mr. Budi', role: 'guru_bk', avatarId: 'user-avatar-2'},
    { id: 'u3', name: 'Mrs. Ani', role: 'guru_bk', avatarId: 'user-avatar-3'},
    { id: 'u4', name: 'Admin', role: 'admin', avatarId: 'user-avatar-4'},
]

export const weeklyCases = [
  { day: 'Mon', cases: 4 },
  { day: 'Tue', cases: 3 },
  { day: 'Wed', cases: 5 },
  { day: 'Thu', cases: 2 },
  { day: 'Fri', cases: 6 },
  { day: 'Sat', cases: 1 },
  { day: 'Sun', cases: 0 },
];

export const casesByType = [
  { type: 'Academic', count: 120 },
  { type: 'Personal', count: 85 },
  { type: 'Career', count: 60 },
  { type: 'Social', count: 95 },
  { type: 'Family', count: 40 },
];

export const casesByCounselor = [
  { counselor: 'Dr. Ina', count: 150 },
  { counselor: 'Mr. Budi', count: 130 },
  { counselor: 'Mrs. Ani', count: 120 },
];
