export const students = [
  { id: '1', name: 'Ahmad Dahlan', nis: '12345', class: 'XII-A', major: 'Science', avatarId: 'student-avatar-1', jenjang: 'SMA', tahunAjaran: '2023/2024', jenisKelamin: 'Laki-laki' },
  { id: '2', name: 'Budi Santoso', nis: '12346', class: 'XII-B', major: 'Social', avatarId: 'student-avatar-2', jenjang: 'SMA', tahunAjaran: '2023/2024', jenisKelamin: 'Laki-laki' },
  { id: '3', name: 'Citra Lestari', nis: '12347', class: 'XI-A', major: 'Science', avatarId: 'student-avatar-3', jenjang: 'SMA', tahunAjaran: '2023/2024', jenisKelamin: 'Perempuan' },
  { id: '4', name: 'Dewi Anggraini', nis: '12348', class: 'X-C', major: 'Language', avatarId: 'student-avatar-4', jenjang: 'SMA', tahunAjaran: '2023/2024', jenisKelamin: 'Perempuan' },
  { id: '5', name: 'Eko Prasetyo', nis: '12349', class: 'XII-C', major: 'Social', avatarId: 'student-avatar-5', jenjang: 'SMA', tahunAjaran: '2023/2024', jenisKelamin: 'Laki-laki' },
  { id: '6', name: 'Fitriani', nis: '12350', class: 'XI-B', major: 'Science', avatarId: 'student-avatar-6', jenjang: 'SMA', tahunAjaran: '2023/2024', jenisKelamin: 'Perempuan' },
  { id: '7', name: 'Gilang Ramadhan', nis: '12351', class: 'X-A', major: 'Social', avatarId: 'student-avatar-7', jenjang: 'SMA', tahunAjaran: '2023/2024', jenisKelamin: 'Laki-laki' },
];

export type Treatment = {
  id: string;
  tanggal_pertemuan: string;
  description: string;
};

export type Case = {
  id: string;
  kode_kasus: string;
  studentName: string;
  studentAvatarId: string;
  anamnesa: string;
  treatments: Treatment[];
  status: 'Active' | 'Closed' | 'Archived';
  counselorName: string; // Corresponds to id_bk
  lastMeeting: string; // Derived from the latest treatment date
};


export const cases: Case[] = [
  { 
    id: 'c1',
    kode_kasus: 'Academic',
    studentName: 'Ahmad Dahlan', 
    studentAvatarId: 'student-avatar-1', 
    anamnesa: 'Siswa mengeluhkan kesulitan fokus belajar dan sering mengantuk di kelas. Nilai beberapa mata pelajaran menurun.',
    treatments: [
      { id: 't1-1', tanggal_pertemuan: '2024-05-10', description: 'Sesi pertama: Mendiskusikan pola tidur dan kebiasaan belajar.'},
    ],
    status: 'Active', 
    counselorName: 'Dr. Ina', 
    lastMeeting: '2024-05-10' 
  },
  { 
    id: 'c2', 
    kode_kasus: 'Personal',
    studentName: 'Budi Santoso', 
    studentAvatarId: 'student-avatar-2', 
    anamnesa: 'Siswa merasa cemas dan kurang percaya diri saat berinteraksi dengan teman-temannya. Cenderung menyendiri.',
    treatments: [
      { id: 't2-1', tanggal_pertemuan: '2024-05-01', description: 'Identifikasi pemicu kecemasan sosial.'},
      { id: 't2-2', tanggal_pertemuan: '2024-05-12', description: 'Latihan teknik relaksasi dan role playing interaksi sosial.'},
    ],
    status: 'Active', 
    counselorName: 'Mr. Budi', 
    lastMeeting: '2024-05-12' 
  },
  { 
    id: 'c3',
    kode_kasus: 'Career',
    studentName: 'Citra Lestari', 
    studentAvatarId: 'student-avatar-3', 
    anamnesa: 'Siswa bingung dalam menentukan pilihan jurusan untuk melanjutkan ke perguruan tinggi. Belum ada gambaran karir masa depan.',
    treatments: [
      { id: 't3-1', tanggal_pertemuan: '2024-04-10', description: 'Tes minat dan bakat.'},
      { id: 't3-2', tanggal_pertemuan: '2024-04-20', description: 'Diskusi hasil tes dan eksplorasi berbagai pilihan karir dan jurusan.'},
    ],
    status: 'Closed', 
    counselorName: 'Dr. Ina', 
    lastMeeting: '2024-04-20' 
  },
  { 
    id: 'c4', 
    kode_kasus: 'Social',
    studentName: 'Ahmad Dahlan', 
    studentAvatarId: 'student-avatar-1', 
    anamnesa: 'Terlibat konflik dengan teman sekelas. Merasa dikucilkan.',
    treatments: [
      { id: 't4-1', tanggal_pertemuan: '2024-03-08', description: 'Mediator konflik antara siswa dan temannya.'},
      { id: 't4-2', tanggal_pertemuan: '2024-03-15', description: 'Sesi konseling kelompok untuk membangun kembali hubungan sosial.'},
    ],
    status: 'Closed', 
    counselorName: 'Mr. Budi', 
    lastMeeting: '2024-03-15' 
  },
  { 
    id: 'c5', 
    kode_kasus: 'Academic',
    studentName: 'Eko Prasetyo', 
    studentAvatarId: 'student-avatar-5', 
    anamnesa: 'Siswa menunjukkan gejala prokrastinasi dalam mengerjakan tugas-tugas sekolah.',
    treatments: [
      { id: 't5-1', tanggal_pertemuan: '2024-05-11', description: 'Menerapkan teknik manajemen waktu dan pembuatan jadwal.'},
    ],
    status: 'Active', 
    counselorName: 'Dr. Ina', 
    lastMeeting: '2024-05-11' 
  },
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
  { type: 'Other', count: 20 },
];

export const casesByCounselor = [
  { counselor: 'Dr. Ina', count: 150 },
  { counselor: 'Mr. Budi', count: 130 },
  { counselor: 'Mrs. Ani', count: 120 },
];
