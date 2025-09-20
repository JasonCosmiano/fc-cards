'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CardStats {
  name: string;
  rating: number;
  position: string;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

const Card = () => {
  const [stat, setStat] = useState<CardStats | null>(null);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (!Array.isArray(data.results) || data.results.length === 0) {
        throw new Error('API response does not contain a valid results array');
      }

      setStat(data.results[0]); // Use the only result
    } catch (error: any) {
      console.error('Failed to fetch stats:', error.message);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="w-[500px] bg-white shadow-md rounded relative flex flex-col items-center p-4 space-y-4">
      {/* Card Background */}
      <div className="relative w-full h-[600px]">
        <Image
          src="/totyIcon.png"
          alt="card"
          objectFit="cover"
          fill
          className="rounded"
        />

        {/* Header Info: Rating & Position */}
        <div className="text-[#4a4f10] text-6xl font-bold px-17 mt-20 z-10 relative">
          {stat ? stat.rating : '...'}
        </div>
        <div className="text-[#4a4f10] text-3xl px-17 z-10 relative">
          {stat ? stat.position : '...'}
        </div>

        {/* Subject Face */}
        <div className="relative w-[260px] h-[350px] mx-auto -mt-33 z-10">
          <Image
            src="/Subject.png"
            alt="face"
            objectFit="cover"
            fill
          />
        </div>

        {/* Player Name */}
        <div className="text-[#4a4f10] text-3xl font-bold text-left w-full px-40 z-10 relative">
          {stat ? stat.name : 'Loading...'}
        </div>

        {/* Stat Labels */}
        <div className="flex justify-between text-[#4a4f10] text-lg font-bold w-full px-18 pt-4 z-10 relative">
          <span>PAC</span>
          <span>SHO</span>
          <span>PAS</span>
          <span>DRI</span>
          <span>DEF</span>
          <span>PHY</span>
        </div>

        {/* Stat Values */}
        <div className="flex justify-between text-[#4a4f10] text-3xl font-bold w-full px-18 z-10 relative">
          <span>{stat ? stat.pace : '-'}</span>
          <span>{stat ? stat.shooting : '-'}</span>
          <span>{stat ? stat.passing : '-'}</span>
          <span>{stat ? stat.dribbling : '-'}</span>
          <span>{stat ? stat.defending : '-'}</span>
          <span>{stat ? stat.physical : '-'}</span>
        </div>

        {/* Badges */}
        <div className="flex justify-start gap-2 px-40 mt-2">
          <div className="relative w-[55px] h-[28px]">
            <Image
              src="/Flag-Philippines.webp"
              alt="flag"
              fill
              objectFit="cover"
            />
          </div>
          <div className="relative w-[30px] h-[30px]">
            <Image
              src="/LaLiga.png"
              alt="league"
              fill
              objectFit="cover"
            />
          </div>
          <div className="relative w-[30px] h-[30px]">
            <Image
              src="/FC_Barcelona.png"
              alt="club"
              fill
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
