09.01 09:57
import React, { useState } from "react";
import { Page, Card, Button, TextField } from "@shopify/polaris";
import Layout from "../components/Layout";

export default function Orders() {
  const [orderId, setOrderId] = useState("");

  async function generateLabel() {
    await fetch("/api/labels/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shopId: "TESTSHOP",
        orderId,
        from: "Sydney Warehouse",
        to: "Melbourne Customer",
        carrier: "AustraliaPost",
      }),
    });
    alert("Label generated!");
  }

  return (
    <Layout>
      <Page title="Orders">
        <Card>
          <TextField
            label="Order ID"
            value={orderId}
            onChange={setOrderId}
            autoComplete="off"
          />
          <Button primary onClick={generateLabel}>
            Generate Label
          </Button>
        </Card>
      </Page>
    </Layout>
  );
}
