import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type TokenResponseLocation = {
  data: {
    systemSymbol: string;
    symbol: string;
    type: string;
    x: number;
    y: number;
    orbitals: {
      symbol: string;
    }[];
    traits: {
      symbol: string;
      name: string;
      description: string;
    }[];
    modifiers: unknown[];
    chart: {
      submittedBy: string;
      submittedOn: string;
    };
    faction: {
      symbol: string;
    };
    isUnderConstruction: boolean;
  };
};

function ViewLocation() {
  const [waypointData, setWaypointData] =
    useState<TokenResponseLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const startLocation = localStorage.getItem("startLocation");
    console.log("Token from localStorage:", token);
    console.log("Start location from localStorage:", startLocation);
    if (token && startLocation) {
      const parts = startLocation.split("-");
      const a = `${parts[0]}-${parts[1]}`;
      const b = startLocation;
      console.log("data for a and b:", a, b);
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(
        `https://api.spacetraders.io/v2/systems/${a}/waypoints/${b}`,
        options
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch waypoint data");
          }
          return response.json();
        })
        .then((response) => {
          if (response?.data) {
            setWaypointData(response);
          } else {
            throw new Error("Invalid data structure");
          }
        })
        .catch((err) => setError(err.message));
    } else {
      setError("Token or start location is missing");
    }
  }, [location.state?.token]);

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!waypointData || !waypointData.data) {
    return (
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
        <p>Loading waypoint data...</p>
      </div>
    );
  }

  const {
    systemSymbol,
    symbol,
    type,
    x,
    y,
    orbitals,
    traits,
    faction,
    chart,
    isUnderConstruction,
  } = waypointData.data;

  console.log("waypoint data:", waypointData.data);

  return (
    <div className="bg-gray-800 text-gray-400 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">View Location</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold">System: {systemSymbol}</h2>
        <p>
          <strong>Waypoint:</strong> {symbol}
        </p>
        <p>
          <strong>Type:</strong> {type}
        </p>
        <p>
          <strong>Coordinates:</strong> ({x}, {y})
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">Orbitals</h3>
        {orbitals.length > 0 ? (
          <ul className="list-disc pl-6">
            {orbitals.map((orbital, index) => (
              <li key={index}>{orbital.symbol}</li>
            ))}
          </ul>
        ) : (
          <p>No orbitals available</p>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">Traits</h3>
        {traits.length > 0 ? (
          <ul className="list-disc pl-6">
            {traits.map((trait, index) => (
              <li key={index}>
                <strong>{trait.name}:</strong> {trait.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No traits available</p>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">Faction</h3>
        <p>
          <strong>Faction Symbol:</strong> {faction.symbol}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">Chart Information</h3>
        {chart ? (
          <p>
            Submitted by {chart.submittedBy} on {chart.submittedOn}
          </p>
        ) : (
          <p>No chart information available</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold">Construction Status</h3>
        <p>
          {isUnderConstruction
            ? "Under construction"
            : "Not under construction"}
        </p>
      </div>
    </div>
  );
}

export default ViewLocation;
