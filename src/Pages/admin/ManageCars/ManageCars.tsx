

const data = [
  { name: "Abhiraj K", role: "Developer", status: "Active", img: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722165/AbhirajK/Abhirajk.webp" },
  { name: "John Doe", role: "Designer", status: "Active", img: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722163/AbhirajK/Abhirajk%20mykare.webp" },
  { name: "Jane Smith", role: "Project Manager", status: "Inactive", img: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk2.webp" },
  { name: "Emily Davis", role: "QA Engineer", status: "Active", img: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk2.webp" },
  { name: "Michael Brown", role: "DevOps Engineer", status: "Pending", img: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722159/AbhirajK/Abhirajk5.webp" },
];



const ManageCar = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">image</th>
              <th className="px-6 py-3">band</th>
              <th className="px-6 py-3">update</th>
              <th className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((person, index) => (
              <tr key={index} className={`border-b dark:border-gray-700 ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}`}>
              <td className="px-6 py-4">
                  <img src={person.img} alt={person.name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-6 py-4">{person.name}</td>
                <td className="px-6 py-4">{person.role}</td>
                <td className={`px-6 py-4 ${getStatusColor(person.status)}`}>{person.status}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
          <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">Previous</button>
          <span className="text-sm text-gray-700 dark:text-gray-400">Page 1 of 10</span>
          <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ManageCar;
