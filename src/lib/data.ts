
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
  counselorName: string; 
  lastMeeting: string; 
};


export const cases: Case[] = [];

export const users: any[] = [];

export const weeklyCases: any[] = [];

export const casesByType: any[] = [];

export const casesByCounselor: any[] = [];

export const students: any[] = [];
