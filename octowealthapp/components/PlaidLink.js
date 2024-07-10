// components/PlaidLink.js
import React, { useCallback } from "react";
import { WebView } from "react-native-webview";

const PlaidLink = ({ onPlaidLinkExit, onPlaidLinkSuccess }) => {
  const plaidLinkUri = "YOUR_PLAID_LINK_URL"; // URL from your backend to initiate Plaid Link

  const handleMessage = useCallback(
    (event) => {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.action === "exit") {
        onPlaidLinkExit();
      } else if (data.action === "success") {
        onPlaidLinkSuccess(data.public_token);
      }
    },
    [onPlaidLinkExit, onPlaidLinkSuccess],
  );

  return <WebView source={{ uri: plaidLinkUri }} onMessage={handleMessage} />;
};

export default PlaidLink;
