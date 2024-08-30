import React from 'react'

const HomePage: React.FC = () => {

  return (
    <nav>
      <p className="mt-4 text-end text-sm text-gray-600">
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
      <p className="mt-4 text-end text-sm text-gray-600">
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </a>
      </p>
    </nav>
  )
}

export default HomePage
