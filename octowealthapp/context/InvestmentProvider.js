import { createContext, useState } from "react";
import { lawnGreen, lightSkyBlue, pictonBlue } from "../constants/colors";

export const InvestmentContext = createContext();

const InvestmentProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([
    {
      name: "Abyan Capital",
      portfolioValue: 22600.0,
      profitLoss: 500.0,
      profitLossPercentage: 10,
      investments: [
        { title: "Equities", color: lawnGreen, amount: 50 },
        { title: "Instruments", color: pictonBlue, amount: 30 },
        { title: "Real Estate", color: lightSkyBlue, amount: 10 },
      ],
      type: "growth portfolio",
    },
    {
      name: "Derayah Financial",
      portfolioValue: 22600.0,
      profitLoss: 500.0,
      profitLossPercentage: 10,
      investments: [
        { title: "Equities", color: lawnGreen, amount: 50 },
        { title: "Instruments", color: pictonBlue, amount: 35 },
        { title: "Real Estate", color: lightSkyBlue, amount: 15 },
      ],
      type: "growth portfolio",
    }
  ]);
  return (
    <InvestmentContext.Provider value={{ portfolio, setPortfolio }}>
      {children}
    </InvestmentContext.Provider>
  );
};

export default InvestmentProvider;
