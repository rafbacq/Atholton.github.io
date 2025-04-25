import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"

export default function TeacherHome() {
  return (
    <main className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <NavigationBar userType="teacher" currentDate="MARCH 8, 2023" />

      <div className="p-4">
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4 transition-colors duration-300">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-raider-green dark:text-green-400 transition-colors">
              ATHOLTON HIGH SCHOOL
              <br />
              RAIDER TIME
            </h1>
            <p className="text-sm text-raider-green dark:text-green-400 transition-colors">TEACHER HOME</p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2 dark:text-white">My Open Rooms</h2>
            <div className="border border-gray-300 dark:border-gray-600 p-2 rounded-sm h-36 dark:text-gray-200 transition-colors duration-300">
              {/* Open rooms content */}
            </div>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2 dark:text-white">My Pre-Placed Students</h2>
            <div className="border border-gray-300 dark:border-gray-600 p-2 rounded-sm h-36 dark:text-gray-200 transition-colors duration-300">
              {/* Students content */}
            </div>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2 dark:text-white">Students</h2>
            <div className="border border-gray-300 dark:border-gray-600 rounded-sm transition-colors duration-300">
              <table className="w-full text-sm">
                <thead className="bg-raider-green text-white">
                  <tr>
                    <th className="p-1 text-left">Student</th>
                    <th className="p-1 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="dark:text-gray-200">
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <td className="p-1">John Doe</td>
                    <td className="p-1 text-right">
                      <Button
                        variant="outline"
                        className="text-xs h-6 py-0 px-2 dark:border-gray-600 dark:text-gray-200 transition-colors"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1">Jane Smith</td>
                    <td className="p-1 text-right">
                      <Button
                        variant="outline"
                        className="text-xs h-6 py-0 px-2 dark:border-gray-600 dark:text-gray-200 transition-colors"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

