import AnomalyDistribution from "../charts/AnomalyDistribution.jsx";
import AnomalyTrend from "../charts/AnomalyTrend.jsx";

function AnomalyChart() {
  return (
    <section
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <AnomalyDistribution />
      <AnomalyTrend />
    </section>
  );
}

export default AnomalyChart;