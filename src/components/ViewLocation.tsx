import { useState } from "react";
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

    modifiers: unknown[]; // If you have more details about modifiers, replace `unknown` with appropriate types

    chart: {
      submittedBy: string;
      submittedOn: string; // You can use Date if you convert the string into a Date object
    };

    faction: {
      symbol: string;
    };

    isUnderConstruction: boolean;
  };
};

function ViewLocation() {
  const [data, setData] = useState<TokenResponseLocation | null>(null);
  const location = useLocation;
}
