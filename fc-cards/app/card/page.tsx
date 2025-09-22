"use client";

import React, { useState } from "react";
import Card from "../components/card/card";

const countries: string[] = [
  "Argentina",
  "Brazil",
  "England",
  "Germany",
  "Italy",
  "Netherlands",
  "France",
  "Spain",
  "Portugal",
  "Philippines",
];

interface CountrySelectorProps {
  selectedCountry: string;
  onChange: (league: string) => void;
}

const CountryDropdown: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onChange,
}) => {


  return (
    <div className="flex flex-col gap-2 w-64">
      <label htmlFor="country" className="text-sm font-medium text-gray-700">
        Select Country
      </label>
      <select
        id="country"
        value={selectedCountry}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          -- Choose a country --
        </option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};


const leagueToClubs: Record<string, string[]> = {
  "Premier League": [
    "Arsenal",
    "Chelsea",
    "Liverpool",
    "Manchester City",
    "Manchester United",
    "Tottenham Hotspur",
  ],
  LaLiga: [
    "Athletic Bilbao",
    "Atlético Madrid",
    "FC Barcelona",
    "Real Betis",
    "Real Madrid",
    "Sevilla",
  ],
  Bundesliga: [
    "Bayer Leverkusen",
    "Bayern Munich",
    "Borussia Dortmund",
    "Eintracht Frankfurt",
    "RB Leipzig",
    "VfL Wolfsburg",
  ],
  "Serie A": [
    "Atalanta",
    "Inter Milan",
    "Juventus",
    "AC Milan",
    "Napoli",
    "Roma",
  ],
  "Ligue 1": [
    "Lille",
    "Lyon",
    "Marseille",
    "Monaco",
    "Nice",
    "Paris Saint-Germain",
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
    { id: "name", label: "Name", type: "text" },
    { id: "rating", label: "Overall Rating", type: "number" },
    { id: "position", label: "Position", type: "text" },
    { id: "pace", label: "Pace", type: "number" },
    { id: "shooting", label: "Shooting", type: "number" },
    { id: "passing", label: "Passing", type: "number" },
    { id: "dribbling", label: "Dribbling", type: "number" },
    { id: "defending", label: "Defending", type: "number" },
    { id: "physical", label: "Physical", type: "number" },
  ];

  

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const {
      name,
      rating,
      position,
      pace,
      shooting,
      passing,
      dribbling,
      defending,
      physical,
    } = formData;

    const payload = {
      name,
      rating,
      position,
      pace,
      shooting,
      passing,
      dribbling,
      defending,
      physical, // rename here
    };

      const response = await fetch("http://localhost:3000/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit");
      }

      const data = await response.json();
      setSuccess("Player saved successfully!");
      console.log("API response:", data);

      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
     <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-sm p-4 border rounded-md shadow-md"
    >
      {inputs.map(({ id, label, type }) => (
        <React.Fragment key={id}>
          <label htmlFor={id} className="text-gray-700 font-medium mb-1">
            {label}
          </label>
          <input
            id={id}
            type={type}
            required
            min={type === "number" ? 1 : undefined}
            max={type === "number" ? 99 : undefined}
            step={type === "number" ? 1 : undefined}
            value={formData[id] || ""}
            onChange={handleChange}
            placeholder={`Enter ${label.toLowerCase()}...`}
            className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </React.Fragment>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

const CardPage: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleLeagueChange = (league: string) => {
    setSelectedLeague(league);
    setSelectedClub(""); // Reset club when league changes
  };

  const handleClubChange = (club: string) => {
    setSelectedClub(club);
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <div className="flex items-start gap-4">
        <Card 
          selectedLeague={selectedLeague}
          selectedClub={selectedClub}
          selectedCountry={selectedCountry}
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

      <CountryDropdown
        selectedCountry={selectedCountry}
        onChange={handleCountryChange}
      />
    </div>
  );
};

export default CardPage;
