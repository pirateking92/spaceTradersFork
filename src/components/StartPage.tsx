import { useState } from "react";
import { useNavigate } from "react-router-dom"; // for routing

function StartPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState(""); // Store the token
  const [resp, setResp] = useState("");
  const [form, setForm] = useState({ symbol: "", faction: "COSMIC" });

  // Handle form submission and agent registration
  const handleSubmit = async () => {
    const resp = await fetch("https://api.spacetraders.io/v2/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol: form.symbol,
        faction: form.faction,
      }),
    });

    const json = await resp.json();

    if (resp.ok) {
      const token = json.data.token;
      setToken(token); // Store token in component state
      localStorage.setItem("token", token); // Save token to localStorage
      console.log("Saved token:", localStorage.getItem("token"));
      setResp(JSON.stringify(json, null, 2));
    } else {
      console.error("Registration failed", json);
    }
  };

  // Handle "Continue" button click to navigate to MyAgent component
  const handleContinue = () => {
    navigate("/myagent", { state: { token } }); // Pass token via state
  };

  return (
    <>
      <h1 className="text-blue-600 text-3xl center">SPAAAACE</h1>
      <p>
        <label htmlFor="Agent Name">Agent Name</label>
        <input
          id="Agent Name"
          name="Agent Name"
          value={form.symbol}
          onChange={(e) => setForm({ ...form, symbol: e.currentTarget.value })}
        />
      </p>
      <label htmlFor="faction">Faction</label>
      <input
        name="faction"
        value={form.faction}
        onChange={(e) => setForm({ ...form, faction: e.currentTarget.value })}
      />
      <input type="submit" value="Submit" onClick={handleSubmit} />
      <p className="text-white">
        Please save this API token somewhere safe! It is needed for login and
        you won't see it again!
      </p>
      <pre className="text-white">API Token: {token}</pre>{" "}
      {/* Display token after it's received */}
      {token && (
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={handleContinue}
        >
          Continue
        </button> /* Show only if token exists */
      )}
      {/* <pre>Response: {resp}</pre> */}
    </>
  );
}

export default StartPage;