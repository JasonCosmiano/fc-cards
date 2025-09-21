"use client";

import React, { useState } from "react";
import Card from "../components/card/card";

const leagueToClubs: Record<string, string[]> = {
  "Premier League": [
    "Arsenal",
    "Aston Villa",
    "Bournemouth",
    "Brentford",
    "Brighton & Hove Albion",
    "Burnley",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Fulham",
    "Leeds United",
    "Liverpool",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Nottingham Forest",
    "Sunderland",
    "Tottenham Hotspur",
    "West Ham United",
    "Wolverhampton Wanderers",
  ],
  LaLiga: [
    "Alavés",
    "Athletic Bilbao",
    "Atlético Madrid",
    "Celta Vigo",
    "Elche",
    "Espanyol",
    "FC Barcelona",
    "Getafe",
    "Girona",
    "Levante",
    "Mallorca",
    "Osasuna",
    "Rayo Vallecano",
    "Real Betis",
    "Real Madrid",
    "Real Oviedo",
    "Real Sociedad",
    "Sevilla",
    "Valencia",
    "Villarreal",
  ],
  Bundesliga: [
    "Bayer Leverkusen",
    "Bayern Munich",
    "Borussia Dortmund",
    "Borussia Mönchengladbach",
    "Eintracht Frankfurt",
    "FC Augsburg",
    "FC Schalke 04",
    "FSV Mainz 05",
    "Hertha BSC",
    "RB Leipzig",
    "SC Freiburg",
    "TSG Hoffenheim",
    "Union Berlin",
    "VfB Stuttgart",
    "VfL Wolfsburg",
    "Werder Bremen",
    "1. FC Köln",
    "1. FC Heidenheim",
  ],
  "Serie A": [
    "Atalanta",
    "Bologna",
    "Cagliari",
    "Cremonese",
    "Fiorentina",
    "Genoa",
    "Inter Milan",
    "Juventus",
    "Lazio",
    "Lecce",
    "AC Milan",
    "Napoli",
    "Pisa",
    "Roma",
    "Salernitana",
    "Sassuolo",
    "Torino",
    "Udinese",
    "Hellas Verona",
  ],
  "Ligue 1": [
    "Angers",
    "Auxerre",
    "Brest",
    "Le Havre",
    "Lens",
    "Lille",
    "Lorient",
    "Lyon",
    "Marseille",
    "Metz",
    "Monaco",
    "Nantes",
    "Nice",
    "Paris FC",
    "Paris Saint‑Germain",
    "Rennes",
    "Strasbourg",
    "Toulouse",
  ],
};

// LeagueSelector Component
interface LeagueSelectorProps {
  selectedLeague: string;
  onChange: (league: string) => void;
}

const LeagueSelector: React.FC<LeagueSelectorProps> = ({
  selectedLeague,
  onChange,
}) => {
  return (
    <>
      <label htmlFor="league" className="block text-gray-700 font-medium mb-2">
        League
      </label>
      <select
        id="league"
        value={selectedLeague}
        onChange={(e) => onChange(e.target.value)}
        className="relative z-10 border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a league</option>
        {Object.keys(leagueToClubs).map((league) => (
          <option key={league} value={league}>
            {league}
          </option>
        ))}
      </select>
    </>
  );
};

// ClubSelector Component
interface ClubSelectorProps {
  selectedLeague: string;
  selectedClub: string;
  onChange: (club: string) => void;
}

const ClubSelector: React.FC<ClubSelectorProps> = ({
  selectedLeague,
  selectedClub,
  onChange,
}) => {
  const clubs = leagueToClubs[selectedLeague] || [];

  return (
    <>
      <label htmlFor="club" className="block text-gray-700 font-medium mb-2">
        Club
      </label>
      <select
        id="club"
        value={selectedClub}
        onChange={(e) => onChange(e.target.value)}
        disabled={!selectedLeague}
        className="relative z-10 border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">
          {selectedLeague ? "Select a club" : "Select a league first"}
        </option>
        {clubs.map((club) => (
          <option key={club} value={club}>
            {club}
          </option>
        ))}
      </select>
    </>
  );
};

// PlayerAttributesForm Component
const PlayerAttributesForm: React.FC = () => {
  const inputs = [
    { id: "name", label: "Name" },
    { id: "rating", label: "Overall Rating" },
    { id: "position", label: "Position" },
    { id: "pace", label: "Pace" },
    { id: "shooting", label: "Shooting" },
    { id: "passing", label: "Passing" },
    { id: "dribbling", label: "Dribbling" },
    { id: "defending", label: "Defending" },
    { id: "physicality", label: "Physicality" },
  ];

  return (
    <div className="flex flex-col w-full max-w-sm">
      {inputs.map(({ id, label }) => (
        <React.Fragment key={id}>
          <label
            htmlFor={id}
            className="block text-gray-700 font-medium mb-2"
          >
            {label}
          </label>
          <input
            id={id}
            type="text"
            placeholder="Enter something..."
            className="relative z-10 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
        </React.Fragment>
      ))}
    </div>
  );
};

const CardPage: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedClub, setSelectedClub] = useState("");

  const handleLeagueChange = (league: string) => {
    setSelectedLeague(league);
    setSelectedClub(""); // Reset club when league changes
  };

  const handleClubChange = (club: string) => {
    setSelectedClub(club);
  };

  return (
    <div>
      <div className="flex items-start gap-4">
        <Card 
          selectedLeague={selectedLeague}
          selectedClub={selectedClub}
        />

        <PlayerAttributesForm />
      </div>

      <LeagueSelector
        selectedLeague={selectedLeague}
        onChange={handleLeagueChange}
      />

      <ClubSelector
        selectedLeague={selectedLeague}
        selectedClub={selectedClub}
        onChange={handleClubChange}
      />
    </div>
  );
};

export default CardPage;
