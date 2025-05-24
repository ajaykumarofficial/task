import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/auth/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRows(res.data.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
  <h2 className="text-2xl font-semibold mb-4 text-center">Static Table - Protected Page</h2>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="py-3 px-6 text-left">ID</th>
          <th className="py-3 px-6 text-left">Name</th>
          <th className="py-3 px-6 text-left">Email</th>
          <th className="py-3 px-6 text-left">DOB</th>
          <th className="py-3 px-6 text-left">Role</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr
            key={row.id}
            className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
          >
            <td className="py-3 px-6">{row.id}</td>
            <td className="py-3 px-6">{row.name}</td>
            <td className="py-3 px-6">{row.email}</td>
            <td className="py-3 px-6">{row.dob}</td>
            <td className="py-3 px-6">{row.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default Dashboard;
