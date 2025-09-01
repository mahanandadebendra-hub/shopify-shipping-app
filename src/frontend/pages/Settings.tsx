09.01 10:07
import React, { useEffect, useState } from "react";
import { Page, Card, TextField, Button } from "@shopify/polaris";
import Layout from "../components/Layout";

export default function Settings() {
  const [warehouse, setWarehouse] = useState("");

  useEffect(() => {
    fetch("/api/settings?shopId=TESTSHOP")
      .then((res) => res.json())
      .then((data) => setWarehouse(data?.warehouseAddress || ""));
  }, []);

  async function save() {
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shopId: "TESTSHOP", settings: { warehouseAddress: warehouse } }),
    });
    alert("Settings saved");
  }

  return (
    <Layout>
      <Page title="Settings">
        <Card>
          <TextField
            label="Warehouse Address"
            value={warehouse}
            onChange={setWarehouse}
            autoComplete="off"
          />
          <Button primary onClick={save}>
            Save Settings
          </Button>
        </Card>
      </Page>
    </Layout>
  );
}
