import React, { useState } from 'react';

const UserManagement = () => {
  const users = [
    {
      _id: 123213,
      name: 'John',
      email: 'john@example.com',
      role: 'admin',
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer', // default role
  });

  const handleChange =(e) =>
  {
    setFormData({
      ...formData, 
      [e.target.name] : e.target.value,
    });
  };

  const handleSubmit=(e)=>
  {
    e.preventDefault();
    console.log(formData);
    //Reset the form after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) =>
  {
    console.log({id: userId, role: newRole});
  }

  const handleDeleteUser = (userId)=>
  {
    if(window.confirm("Are you sure you want to delete this user?"))
    {
      console.log("deleting user with ID", userId);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {/* Add New User Form */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">Name</label>
            <input 
            type="text" 
            name="name" 
            value={formData.name} 
            className="w-full p-2 border rounded required" 
            onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">Email</label>
            <input 
            type="email" 
            name="email" 
            value={formData.email} 
            className="w-full p-2 border rounded required" 
            onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">Password</label>
            <input 
            type="password" 
            name="password" 
            value={formData.password} 
            className="w-full p-2 border rounded required" 
            onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">Role</label>
            <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange}
            className="w-full p-2 border rounded required">
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type='submit' className="bg-gray-500 text-white py-2 px-2 my-5 rounded hover:bg-green-600">Add User</button>
        </form>
      </div>

      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <td className="py-3 px-4">Name</td>
              <td className="py-3 px-4">Email</td>
              <td className="py-3 px-4">Role</td>
              <td className="py-3 px-4">Actions</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user)=>
            (
              <tr className="border-b hover:bg-gray-50" key={user._id}>
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4 ">
                  {user.email}
                </td>
                <td className="p-4 ">
                  <select 
                  value={user.role}
                  onChange={(e)=>handleRoleChange(user._id, e.target.value)} 
                  className="p-2 border rounded">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4 ">
                  <button onClick={()=> handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
