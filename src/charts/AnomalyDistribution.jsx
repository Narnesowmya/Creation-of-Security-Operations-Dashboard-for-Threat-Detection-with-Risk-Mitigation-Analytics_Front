import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#f97316", "#ef4444"];

function AnomalyDistribution({ data = [] }) {
  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>
        Anomaly Distribution
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={100}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnomalyDistribution;