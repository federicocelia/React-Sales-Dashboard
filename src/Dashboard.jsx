import supabase from "./supabase-client.js";
import { useEffect, useState } from "react";

function Dashboard() {
  const [metrics, setMetrics] = useState([]);

  async function fetchMetrics() {
    try {
      const { error, data } = await supabase.from("sales_deals").select(
        `
    name,
    total_sales:value.sum()
    `,
      );
      if (error) {
        console.log(error);
        throw error;
      }
      console.log(data);
      return setMetrics(data);
    } catch (error) {
      console.log(`There has been an error: ${error}`);
    }
  }

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
      </div>
    </div>
  );
}

export default Dashboard;
