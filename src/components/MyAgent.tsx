import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate(); // would like to eventually move these over to their own helper files

  useEffect(() => {
    const token = location.state?.token;
    console.log("AGENT TOKEN:", token);

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
          const startLocation = response.data.headquarters;
          console.log("startLocation in MyAgent:", startLocation); // Verify startLocation
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

  // function to navigate to ViewLocation. Use for navbar
  const handleViewLocation = () => {
    const token = location.state?.token;
    const startLocation = localStorage.getItem("startLocation");
    console.log("token data:", token);
    console.log("startlocation data:", startLocation);
    if (token && startLocation) {
      navigate("/viewLocation", { state: { token, startLocation } });
    } else {
      console.error("Token and/or startLocation missing");
    }
  };

  return (
    <>
      <h1>My Agent</h1>
      <div></div>
      <div>
        <label className="text-white" htmlFor="account-id">
          Account ID:
        </label>
        <input id="account-id" type="text" value={agent.accountId} readOnly />
      </div>
      <div>
        <label className="text-white" htmlFor="symbol">
          Symbol:
        </label>
        <input id="symbol" type="text" value={agent.symbol} readOnly />
      </div>
      <div>
        <label className="text-white" htmlFor="headquarters">
          Headquarters:
        </label>
        <input
          id="headquarters"
          type="text"
          value={agent.headquarters}
          readOnly
        />
      </div>
      <div>
        <label className="text-white" htmlFor="credits">
          Credits:
        </label>
        <input id="credits" type="number" value={agent.credits} readOnly />
      </div>
      <div>
        <label className="text-white" htmlFor="starting-faction">
          Starting Faction:
        </label>
        <select id="starting-faction" value={agent.startingFaction}>
          <option value="COSMIC">COSMIC</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label className="text-white" htmlFor="ship-count">
          Ship Count:
        </label>
        <input id="ship-count" type="number" value={agent.shipCount} readOnly />
      </div>

      {/* Show "View Location" button if agent data exists */}
      {agent && (
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mt-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={handleViewLocation}
        >
          View Location
        </button>
      )}
    </>
  );
}

export default MyAgent;
