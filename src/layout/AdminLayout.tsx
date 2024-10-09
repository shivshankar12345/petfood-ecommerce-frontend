import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';

 
const AdminLayout: React.FC = () => {
  return (
  
    <div><AdminSidebar />
       <div className="ml-64 p-4 "> {/* Add margin to the main content */}
        <Outlet /> {/* This renders the matched child routes */}
      </div>
</div>
  
  );
};
 
export default AdminLayout;