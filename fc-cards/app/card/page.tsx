import React from 'react';
import Card from '../components/card/card';

const CardPage: React.FC = () => {
  return (
    <div className="flex items-start gap-4">
      <Card />
      <div className="flex flex-col w-full max-w-sm">

        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter something..."
          className="relative z-10 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="rating" className="block text-gray-700 font-medium mb-2">
          Overall Rating
        </label>
        <input
          id="rating"
          type="text"
          placeholder="Enter something..."
          className="relative z-10 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="position" className="block text-gray-700 font-medium mb-2">
          Position
        </label>
        <input
          id="position"
          type="text"
          placeholder="Enter something..."
          className="relative z-10 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="pace" className="block text-gray-700 font-medium mb-2">
          Pace
        </label>
        <input
          id="pace"
          type="text"
          placeholder="Enter something..."
          className="relative z-10 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="shooting" className="block text-gray-700 font-medium mb-2">
          Shooting
        </label>
        <input
          id="shooting"
          type="text"
          placeholder="Enter something..."
          className="relative z-10 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="passing" className="block text-gray-700 font-medium mb-2">
          Passing
        </label>
        <input
          id="passing"
          type="text"
          placeholder="Enter something..."
          className="relative z-10 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="dribbling" className="block text-gray-700 font-medium mb-2">
          Dribbling
        </label>
        <input
          id="dribbling"
          type="text"
          placeholder="Enter something..."
          className="relative z-10 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="defending" className="block text-gray-700 font-medium mb-2">
          Defending
        </label>
        <input
          id="defending"
          type="text"
          placeholder="Enter something..."
          className="relative z-10 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="physicality" className="block text-gray-700 font-medium mb-2">
          Physicality
        </label>
        <input
          id="physicality"
          type="text"
          placeholder="Enter something..."
          className="relative z-10 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>
    </div>
  );
};

export default CardPage;