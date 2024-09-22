import { useState } from "react";

function MyAgent() {
  return (
    <>
      <h1>My Agent</h1>
    </>
  );
}
const options = {
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQkVFUCIsInZlcnNpb24iOiJ2Mi4yLjAiLCJyZXNldF9kYXRlIjoiMjAyNC0wOS0wMSIsImlhdCI6MTcyNzAzMDQ3Niwic3ViIjoiYWdlbnQtdG9rZW4ifQ.DjAPzQF_08s8h0Nu08fn7t3-Pp-AKDbnpmanet0TvONuUysIV1fghqw8CMMQOI0J0MfL326olkCOSPdpY8gPNo_-7b3TZInG0JAaZfTbzOoSCjGC7p-3aOPq0-P_shQBLWrrOxWCUVAMwrlpHSs-gFjvPjIVVMihaPYaeOMIadRhhZER-fARQQ1B3AD2_cRWQx-72u59LsYCTpgjVKJKtwvRkGSOS-SHWplAfkGFP3SlM8hVmCINkCBpBhCbrtEk5GsLgdtmGWbEFicOvEqgwwB2hyRqGJHQr3UBUu8TZKA5oxoRuf-bjMkbj85ni2x6BiiX0OSWZAw7vqFq9b8zYA",
  },
};

fetch("https://api.spacetraders.io/v2/my/agent", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

export default MyAgent;
