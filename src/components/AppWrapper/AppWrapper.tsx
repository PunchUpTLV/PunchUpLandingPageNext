import { StoreProvider } from "app/StoreProvider";
import Notifications from "components/Notifications/notifications";
import ScreenLoader from "components/ScreenLoader/ScreenLoader";
import Popups from "popups/popup";
import React from "react";

function AppWrapper({ children, color = "site", data = undefined }) {
  return (
    <body className={color}>
      <StoreProvider data={data}>
        {children}

        <Notifications />
        <Popups className={color} />

        <ScreenLoader />
      </StoreProvider>
    </body>
  );
}

export default AppWrapper;
