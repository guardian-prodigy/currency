import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const BotToken = process.env.REACT_APP_BOT_TOKEN;
const ChannelId = process.env.REACT_APP_CHANNEL_ID;
const RoleId = process.env.REACT_APP_ROLE_ID;
const SiteUrl = process.env.REACT_APP_SITE_URL;
console.log(SiteUrl);

const fetchDailyUpdates = async () => {
  try {
    const response = await fetch(SiteUrl);
    if (response.ok) {
      const dailyUpdate = await response.json();
      const { code, value } = dailyUpdate.data.SRD;
      console.log(value);

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
