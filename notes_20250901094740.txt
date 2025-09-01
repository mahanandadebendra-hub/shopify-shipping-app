09.01 09:47
import React from "react";
import { AppProvider, Frame, Navigation, TopBar } from "@shopify/polaris";

export default function Layout({ children }) {
  const topBar = <TopBar showNavigationToggle={true} />;
  const navigation = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          { label: "Dashboard", url: "/dashboard" },
          { label: "Orders", url: "/orders" },
          { label: "Reports", url: "/reports" },
          { label: "Settings", url: "/settings" },
        ]}
      />
    </Navigation>
  );

  return (
    <AppProvider i18n={{}}>
      <Frame topBar={topBar} navigation={navigation}>
        {children}
      </Frame>
    </AppProvider>
  );
}
