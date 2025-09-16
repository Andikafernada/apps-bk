
'use server'

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCaseSchema = z.object({
    studentId: z.string().min(1),
    kode_kasus: z.string().min(1),
    anamnesa: z.string().min(1),
    treatmentDescription: z.string().min(1),
    treatmentDate: z.string().min(1),
});

export async function searchStudents(searchTerm: string) {
    if (!searchTerm.trim()) {
        return [];
    }

    const students = await prisma.student.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    }
                },
                {
                    nis: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    }
                }
            ]
        },
        take: 10,
    });

    return students;
}

export async function createCase(data: unknown) {
    const validatedData = createCaseSchema.parse(data);
    const { studentId, kode_kasus, anamnesa, treatmentDescription, treatmentDate } = validatedData;

    // In a real app, you'd get the counselor ID from the logged-in user's session
    const counselor = await prisma.user.findFirst();
    if (!counselor) {
        throw new Error("No counselor found to assign the case to.");
    }
    
    const newCase = await prisma.case.create({
        data: {
            studentId: studentId,
            kode_kasus: kode_kasus,
            anamnesa: anamnesa,
            status: 'Active',
            counselorId: counselor.id, // Assign to the first counselor found
            lastMeeting: new Date(treatmentDate),
            treatments: {
                create: {
                    tanggal_pertemuan: new Date(treatmentDate),
                    description: treatmentDescription,
                    counselorId: counselor.id,
                }
            }
        },
        include: {
            treatments: true,
        }
    });

    revalidatePath('/cases');
    revalidatePath('/dashboard');
    revalidatePath(`/students/${studentId}`);

    return newCase;
}

    