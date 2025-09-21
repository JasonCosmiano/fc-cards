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

type CardProps = {
  selectedLeague: string;
  selectedClub: string;
};

const Card : React.FC<CardProps> = ({ selectedLeague, selectedClub }) => {

  const [stat, setStat] = useState<CardStats | null>(null);

  const leagueImages: Record<string, string> = {
    "LaLiga": "/leagues/LaLiga.png",
    "Bundesliga": "/leagues/Bundesliga.webp",
    "Ligue 1": "/leagues/Ligue 1.svg",
    "Premier League": "/leagues/Premier League.png",
    "Serie A": "/leagues/Serie A.png",
  };

  const leagueSizes: Record<string, string> = {
    "LaLiga": "w-[30px] h-[30px]",
    "Bundesliga": "w-[30px] h-[30px]",
    "Ligue 1": "w-[25px] h-[43px]",
    "Premier League": "w-[34px] h-[34px]",
    "Serie A": "w-[25px] h-[43px]",
  };

    const clubSizes: Record<string, string> = {
    "Arsenal": "w-[30px] h-[35px]",
    "Chelsea": "w-[30px] h-[30px]",
    "Liverpool": "w-[30px] h-[40px] -mt-[5px]",
    "Manchester City": "w-[30px] h-[30px]",
    "Manchester United": "w-[30px] h-[30px]",
    "Tottenham Hotspur": "w-[15px] h-[30px]",
    "Athletic Bilbao": "w-[30px] h-[35px]",
    "Atlético Madrid": "w-[28px] h-[35px]",
    "FC Barcelona": "w-[30px] h-[30px]",
    "Real Betis": "w-[35px] h-[30px]",
    "Real Madrid": "w-[30px] h-[40px] -mt-[5px]",
    "Sevilla": "w-[30px] h-[37px] -mt-[5px]",
    "Bayer Leverkusen": "w-[38px] h-[30px]",
    "Bayern Munich": "w-[30px] h-[30px]",
    "Borussia Dortmund": "w-[30px] h-[30px]",
    "Eintracht Frankfurt": "w-[30px] h-[30px]",
    "RB Leipzig": "w-[45px] h-[30px]",
    "VfL Wolfsburg": "w-[30px] h-[30px]",
    "Atalanta": "w-[25px] h-[40px] -mt-[3px]",
    "Inter Milan": "w-[30px] h-[30px]",
    "Juventus": "w-[21px] h-[33px]",
    "AC Milan": "w-[19px] h-[30px]",
    "Napoli": "w-[30px] h-[30px]",
    "Roma": "w-[30px] h-[39px]",
    "Lille": "w-[30px] h-[30px]",
    "Lyon": "w-[30px] h-[35px]",
    "Marseille": "w-[23px] h-[29px]",
    "Monaco": "w-[20px] h-[35px]",
    "Nice": "w-[28px] h-[35px]",
    "Paris Saint-Germain": "w-[30px] h-[30px]",
  };

  const clubImages: Record<string, string> = {
    "Arsenal": "/clubs/Arsenal_FC.png",
    "Chelsea": "/clubs/Chelsea_FC.webp",
    "Liverpool": "/clubs/Liverpool_FC.svg",
    "Manchester City": "/clubs/Manchester_City_FC.png",
    "Manchester United": "/clubs/Manchester_United_FC.png",
    "Tottenham Hotspur": "/clubs/Tottenham_Hotspur.png",
    "Athletic Bilbao": "/clubs/Athletic_Bilbao.png",
    "Atlético Madrid": "/clubs/Atletico_Madrid.svg",
    "FC Barcelona": "/clubs/FC_Barcelona.png",
    "Real Betis": "/clubs/Real_betis.png",
    "Real Madrid": "/clubs/Real_Madrid.webp",
    "Sevilla": "/clubs/Sevilla_FC.png",
    "Bayer Leverkusen": "/clubs/Bayer_04_Leverkusen.png",
    "Bayern Munich": "/clubs/FC_Bayern_München.png",
    "Borussia Dortmund": "/clubs/Borussia_Dortmund.png",
    "Eintracht Frankfurt": "/clubs/Eintracht_Frankfurt.png",
    "RB Leipzig": "/clubs/RB_Leipzig.png",
    "VfL Wolfsburg": "/clubs/VfL_Wolfsburg.png",
    "Atalanta": "/clubs/AtalantaBC.svg",
    "Inter Milan": "/clubs/FC_Internazionale_Milano.png",
    "Juventus": "/clubs/Juventus_FC.svg",
    "AC Milan": "/clubs/AC_Milan.svg",
    "Napoli": "/clubs/Napoli.svg",
    "Roma": "/clubs/AS_Roma.png",
    "Lille": "/clubs/Lille_OSC.png",
    "Lyon": "/clubs/Olympique_Lyonnais.png",
    "Marseille": "/clubs/Olympique_Marseille.png",
    "Monaco": "/clubs/ASMonaco.svg",
    "Nice": "/clubs/OGC_Nice.png",
    "Paris Saint-Germain": "/clubs/Paris_Saint-Germain.webp",
  };

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
          <div className={`relative ${leagueSizes[selectedLeague] || "w-[30px] h-[30px]"}`}>
            <Image
              src={leagueImages[selectedLeague] || "/leagues/LaLiga.png"}
              alt="league"
              fill
              objectFit="cover"
            />
          </div>
          <div className={`relative ${clubSizes[selectedClub] || "w-[30px] h-[30px]"}`}>
            <Image
              src={clubImages[selectedClub] || "/clubs/FC_Barcelona.png"} 
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
