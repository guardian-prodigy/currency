import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const BotToken =
  "MTEyNTc3Mjc3OTcyNDIzMDY4Ng.Gqa34d.M9e1JsFEWIx-_RuxXFZ7h5XMNknmV5MI1w6ssk";
const ChannelId = "1125770702054764595";
const RoleId = "1083917236059783178";
const SiteUrl =
  "https://api.currencyapi.com/v3/latest?apikey=6GM41w4bflCny4KWrNplJps4QHBzxw2xDSzwlvpE";

const fetchDailyUpdates = async () => {
  try {
    const response = await fetch(SiteUrl);
    if (response.ok) {
      const dailyUpdate = await response.json();
      const { code, value } = dailyUpdate.data.SRD;
      // Process the response and extract the relevant data

      // Send the update to the Discord channel and mention the role
      const webhookUrl = `https://discord.com/api/webhooks/${BotToken}`;
      const roleMention = `<@&${RoleId}>`;
      const message = `${roleMention} Daily Update: 
      1 USD = ${value} ${code}`;

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: message }),
      });
    } else {
      throw new Error("Error fetching data from Google site");
    }
  } catch (error) {
    console.error("Error fetching daily updates:", error);
  }
};

const CallbackComponent = () => {
  useEffect(() => {
    fetchDailyUpdates();
  }, []);

  return <div>Handling OAuth2 callback...</div>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CallbackComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
