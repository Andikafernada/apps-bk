
// This file is no longer needed as we are fetching data from a real database.
// It can be deleted, but we will leave it for now to avoid breaking any imports
// that might still exist. We are replacing its content with empty exports
// to ensure that any code still importing from it does not crash.

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
