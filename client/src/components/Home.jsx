import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-400 to-blue-500'>
      <h1 className='text-4xl font-bold text-white mb-6'>Welcome to My Home Page</h1>
      <div className='space-y-4'>
        {/* Login Button */}
        <Link to='/login'>
          <button className='w-full max-w-xs bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-full font-semibold transition duration-300'>
            Login
          </button>
        </Link>

        {/* Registration Button */}
        <Link to='/register'>
          <button className='w-full max-w-xs bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold transition duration-300 gap-3'>
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
