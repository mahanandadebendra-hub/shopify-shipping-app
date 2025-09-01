09.01 10:03
import React from "react";
import { Page, Card, Button } from "@shopify/polaris";
import Layout from "../components/Layout";

export default function Reports() {
  return (
    <Layout>
      <Page title="Reports">
        <Card>
          <Button onClick={() => (window.location.href = "/api/reports/export.csv")}>
            Export CSV
          </Button>
          <Button onClick={() => (window.location.href = "/api/reports/export.pdf")}>
            Export PDF
          </Button>
        </Card>
      </Page>
    </Layout>
  );
}
