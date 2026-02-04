import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-dark-50 dark:bg-dark-900 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-gray-50 dark:bg-dark-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
