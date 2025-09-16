
import prisma from "@/lib/db"
import StudentsClient from "./students-client"

export default async function StudentsPage() {
    const students = await prisma.student.findMany()

    return <StudentsClient students={students} />
}
