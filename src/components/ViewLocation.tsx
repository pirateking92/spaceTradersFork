import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type TokenResponseLocation = {
  data: {
    systemSymbol: string;
    symbol: string;
    type: string; // You can also make this a specific type like 'PLANET' | 'STAR' if known
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
  const [data, setData] = useState<TokenResponseLocation | null>(null);
  const [waypointData, setWaypointData] = useState<any | null>(null);
  const location = useLocation();

  useEffect(() => {
    const token = location.state?.token;
    const startLocation = localStorage.getItem("startLocation");
    if (token && startLocation) {
      // Split the headquarters by "-"
      const parts = startLocation.split("-");

      const a = `${parts[0].toLowerCase()}-${parts[1].toLowerCase()}`; // x1-df55
      const b = startLocation; // X1-DF55-20250Z
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ${token}",
        },
      };

      fetch(
        `https://api.spacetraders.io/v2/systems/${a}/waypoints/${b}`,
        options
      )
        .then((response) => response.json())
        .then((response) => setWaypointData(response))
        .catch((err) => console.error(err));
    }
  });
  return (
    <div>
      <h1>View Location</h1>
      {waypointData ? (
        <div>
          <h2>Waypoint Data</h2>
          {/* Render the waypoint data here */}
          <pre>{JSON.stringify(waypointData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading waypoint data...</p>
      )}
    </div>
  );
}

export default ViewLocation;
