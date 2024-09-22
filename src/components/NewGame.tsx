import { useState } from "react";

/**
 * This component is a basic MVP of part one of the quickstart. It handles registering your agent and receives a token
 * which you will need to use in subsequent calls. Therefore, you might want to refactor or replace this as you move forward.
 */

function NewGame() {
  const [token, setToken] = useState(); // doesnt persist across page reloads
  const [resp, setResp] = useState("");
  const [form, setForm] = useState({ symbol: "", faction: "COSMIC" });

  return (
    <>
      <h1>New Game</h1>
      <label htmlFor="symbol">Symbol</label>
      <input
        id="symbol"
        name="symbol"
        value={form.symbol}
        onChange={(e) => setForm({ ...form, symbol: e.currentTarget.value })}
      />
      <input
        name="faction"
        value={form.faction}
        onChange={(e) => setForm({ ...form, faction: e.currentTarget.value })}
      />
      <input
        type="submit"
        value="Submit"
        onClick={async () => {
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
          //modify resp.ok to save the token locally
          if (resp.ok) {
            setToken(json.data.token);
            localStorage.setItem("token", json.data.token); //save token locally
          }

          setResp(JSON.stringify(json, null, 2));
        }}
      />
      <pre>API token: {token}</pre>
      <pre>Response: {resp}</pre>
    </>
  );
}

export default NewGame;
