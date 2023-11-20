import React from 'react';
import '../styles/home.css';
import { Link } from 'react-router-dom';
export function Home() {
  return (
    <div className='container-fluid my-0'>
       <div className='home'>
      
            <h2 className='text-light'>Amingoz Tech Shop Inventory Manager</h2>
            <p className='text-light'>Simplifying Stock Management</p>
  
            <button className='btn btn-primary btn-sm me-3 mt-2'>View Products</button>
            <button className='btn btn-primary btn-sm me-3 mt-3'>Add Stock</button>
       </div>
    
    </div>
  )
}
