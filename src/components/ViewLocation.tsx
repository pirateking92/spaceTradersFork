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
    const token = location.state?.token;
    const startLocation = localStorage.getItem("startLocation");
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
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!waypointData || !waypointData.data) {
    return <p>Loading waypoint data...</p>;
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

  return (
    <div className="text-gray-400">
      <h1>View Location</h1>
      <h2>System: {systemSymbol}</h2>
      <p>
        <strong>Waypoint:</strong> {symbol}
      </p>
      <p>
        <strong>Type:</strong> {type}
      </p>
      <p>
        <strong>Coordinates:</strong> ({x}, {y})
      </p>
      <h3>Orbitals</h3>
      {orbitals.length > 0 ? (
        <ul>
          {orbitals.map((orbital, index) => (
            <li key={index}>{orbital.symbol}</li>
          ))}
        </ul>
      ) : (
        <p>No orbitals available</p>
      )}
      <h3>Traits</h3>
      {traits.length > 0 ? (
        <ul>
          {traits.map((trait, index) => (
            <li key={index}>
              <strong>{trait.name}:</strong> {trait.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No traits available</p>
      )}
      <h3>Faction</h3>
      <p>
        <strong>Faction Symbol:</strong> {faction.symbol}
      </p>
      <h3>Chart Information</h3>
      {chart ? (
        <p>
          Submitted by {chart.submittedBy} on {chart.submittedOn}
        </p>
      ) : (
        <p>No chart information available</p>
      )}
      <h3>Construction Status</h3>
      <p>
        {isUnderConstruction ? "Under construction" : "Not under construction"}
      </p>{" "}
    </div>
  );
}

export default ViewLocation;
