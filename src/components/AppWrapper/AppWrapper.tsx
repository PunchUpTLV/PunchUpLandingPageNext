import { StoreProvider } from "app/StoreProvider";
import Notifications from "components/Notifications/notifications";
import ScreenLoader from "components/ScreenLoader/ScreenLoader";
import Popups from "popups/popup";
import React from "react";

function AppWrapper({
  children,
  color = "site",
  data = undefined,
  apiValidationData,
}) {
  return (
    <body className={color}>
      <StoreProvider data={data} apiValidationData={apiValidationData}>
        {children}

        <Notifications />
        <Popups className={color} />

        <ScreenLoader />
      </StoreProvider>
    </body>
  );
}

export default AppWrapper;
