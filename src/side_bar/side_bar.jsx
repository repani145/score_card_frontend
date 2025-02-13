// Sidebar.js
import './side_bar.css';  // Create a separate CSS file for styling
import React, { useState } from 'react';
// import { FaBars, FaTachometerAlt, FaBoxes, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import DashNavbar from '../components/dash_nav';


const AdminLayout = ({ children }) => {
    return (
        <>
        <DashNavbar/>
        <div style={{ display: 'flex' }}>
            {/* <Sidebar /> */}
            <div className={`sidebar`}>
                <button className="toggle-btn" >
                    
                </button>
                {/* <h2 className="sidebar-title">{!collapsed && 'Admin Panel'}</h2> */}
                <ul className="sidebar-menu">
                    <li>
                        <Link to="/dashboard">
                          Dashboard
                             {/* {!collapsed && 'Dashboard'} */}
                        </Link>
                    </li>
                    <li>
                        <Link to="/employees_data">
                        Employees Data
                            {/* <FaBoxes /> {!collapsed && 'AddData'} */}
                        </Link>
                    </li>
                    <li>
                        <Link to="/export_import">
                        ExportImport
                            {/* <FaDollarSign /> {!collapsed && 'ExportImport'} */}
                        </Link>
                    </li>
                    <li>
                        <Link to="/employees_data_from_file">
                        Add Employees & Merics Data   
                            {/* <FaShoppingCart /> {!collapsed && 'Orders'} */}
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/all-categories">
                            <FaShoppingCart /> {!collapsed && 'all_cats'}
                        </Link>
                    </li> */}
                </ul>
            </div>
            <div className='content' style={{
                position: 'fixed', 
                padding: '20px',
                transition: 'margin-left 0.3s ease', // Transition for smooth animation
                // transition: 'width 1s ease',
                // transformOrigin: 'left' 
            }}>
                {children}
            </div>
        </div>
        </>
    );
};

export default AdminLayout;

