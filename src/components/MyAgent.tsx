import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type TokenResponse = {
  data: {
    accountId: string;
    symbol: string;
    headquarters: string;
    credits: number;
    startingFaction: string;
    shipCount: number;
  };
};

function MyAgent() {
  const [data, setData] = useState<TokenResponse | null>(null);
  const location = useLocation();

  useEffect(() => {
    const token = location.state?.token;

    if (token) {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      fetch("https://api.spacetraders.io/v2/my/agent", options)
        .then((response) => response.json())
        .then((response) => {
          setData(response); // Set the data
          const startLocation = response.data.startLocation;
          localStorage.setItem("startLocation", startLocation);
        })
        .catch((err) => console.error(err));
    }
  }, [location.state?.token]);

  // Data exists, check if agent exists
  const agent = data?.data;

  if (!agent) {
    return <div>No agent data available</div>;
  }

  return (
    <>
      <h1>My Agent</h1>
      <div>
        <label htmlFor="account-id">Account ID:</label>
        <input id="account-id" type="text" value={agent.accountId} readOnly />
      </div>
      <div>
        <label htmlFor="symbol">Symbol:</label>
        <input id="symbol" type="text" value={agent.symbol} readOnly />
      </div>
      <div>
        <label htmlFor="headquarters">Headquarters:</label>
        <input
          id="headquarters"
          type="text"
          value={agent.headquarters}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="credits">Credits:</label>
        <input id="credits" type="number" value={agent.credits} readOnly />
      </div>
      <div>
        <label htmlFor="starting-faction">Starting Faction:</label>
        <select id="starting-faction" value={agent.startingFaction}>
          <option value="COSMIC">COSMIC</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="ship-count">Ship Count:</label>
        <input id="ship-count" type="number" value={agent.shipCount} readOnly />
      </div>

      {/* Add more fields for contracts, faction, ship data, etc. */}
    </>
  );
}

export default MyAgent;
