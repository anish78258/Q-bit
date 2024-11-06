import React, { useState } from 'react';

function SignUpForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <form
      className="flex flex-col gap-4 bg-white p-8 w-full max-w-md mx-auto rounded-2xl font-sans shadow-md"
      onSubmit={handleSignUp}
    >
      <div className="flex flex-col">
        <label className="text-gray-800 font-semibold">Full Name</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 h-12 focus-within:border-blue-500 transition">
          <input
            type="text"
            placeholder="Enter your Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="ml-2 flex-1 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-800 font-semibold">Email</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 h-12 focus-within:border-blue-500 transition">
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="ml-2 flex-1 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-800 font-semibold">Username</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 h-12 focus-within:border-blue-500 transition">
          <input
            type="text"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="ml-2 flex-1 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-800 font-semibold">Password</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 h-12 focus-within:border-blue-500 transition">
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="ml-2 flex-1 outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-gray-800 text-white font-medium rounded-lg h-12 w-full hover:bg-gray-900 transition"
      >
        Sign Up
      </button>

      <p className="text-center text-gray-700 text-sm mt-4">
        Already have an account?{' '}
        <span className="text-blue-500 font-medium cursor-pointer">
          Sign In
        </span>
      </p>
    </form>
  );
}

export default SignUpForm;
