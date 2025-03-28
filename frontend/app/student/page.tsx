"use client"

import { useEffect, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { ClassCard } from "@/components/class-card"
import { BellSchedule } from "@/components/bell-schedule"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getStudent, getAnnouncements, type Student, type Announcement } from "@/lib/api/student"
import { format } from "date-fns"

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // TODO: Get actual student ID from auth context
        const studentId = 1;
        const studentData = await getStudent(studentId);
        setStudent(studentData.student);
        
        const announcementsData = await getAnnouncements(1);
        setAnnouncements(announcementsData.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <MainNav userType="student" />

      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-normal mb-2 text-gray-700 dark:text-gray-300">Welcome</h2>
            <h1 className="text-4xl font-bold dark:text-white">{student?.name.toUpperCase()}</h1>
            <p className="mt-4 font-mono text-2xl dark:text-gray-200">
              TODAY'S DATE:{" "}
              <span className="text-raider-green dark:text-green-400">
                {format(new Date(), "MMMM d, yyyy").toUpperCase()}
              </span>
            </p>
          </div>

          <Button className="bg-raider-green hover:bg-raider-lightgreen dark:bg-raider-darkgray dark:hover:bg-gray-700 text-white text-xl px-8 py-6 h-auto rounded-lg transition-colors">
            Sign Out
          </Button>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl mb-6 dark:text-white">MY CLASSES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TODO: Replace with actual class data */}
            <ClassCard 
              teacher={student?.teacher.first_name + " " + student?.teacher.last_name} 
              room="B125" 
              date={format(new Date(), "MMMM d, yyyy").toUpperCase()} 
              status="approved" 
            />
          </div>
          <div className="text-right mt-2">
            <Link href="/student/all">
              <Button
                variant="link"
                className="text-lg underline text-raider-green dark:text-green-400 transition-colors"
              >
                VIEW ALL
              </Button>
            </Link>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl mb-4 dark:text-white">STUDENT DASHBOARD</h2>
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-6 transition-colors duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <p>Email: {student?.hcpss_email}</p>
                {student?.account_email && <p>Personal Email: {student?.account_email}</p>}
                {student?.phone_num && <p>Phone: {student?.phone_num}</p>}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Teachers</h3>
                <p>Primary: {student?.teacher.first_name} {student?.teacher.last_name}</p>
                {student?.teacher_period2 && (
                  <p>Period 2: {student?.teacher_period2.first_name} {student?.teacher_period2.last_name}</p>
                )}
                {student?.temp_teacher && <p>Temporary: {student?.temp_teacher}</p>}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl mb-4 dark:text-white">RAIDER NEWS</h2>
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-6 transition-colors duration-300">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="mb-6 last:mb-0">
                <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  By {announcement.teacher.first_name} {announcement.teacher.last_name} on{" "}
                  {format(new Date(announcement.timestamp), "MMMM d, yyyy")}
                </p>
                <p>{announcement.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl mb-4 dark:text-white">BELL SCHEDULE</h2>
          <BellSchedule className="shadow-md" />
        </section>
      </main>
    </div>
  )
}