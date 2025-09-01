09.01 09:52
import React, { useEffect, useState } from "react";
import { Page, Card, DataTable } from "@shopify/polaris";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetch("/api/labels")
      .then((res) => res.json())
      .then((data) => setLabels(data || []));
  }, []);

  return (
    <Layout>
      <Page title="Dashboard">
        <Card title="Recent Labels">
          <DataTable
            columnContentTypes={["text", "text", "text"]}
            headings={["Order ID", "Carrier", "Status"]}
            rows={labels.map((l) => [l.orderId, l.carrier, l.status])}
          />
        </Card>
      </Page>
    </Layout>
  );
}
