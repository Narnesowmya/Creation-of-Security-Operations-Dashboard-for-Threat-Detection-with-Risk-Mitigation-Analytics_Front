import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return timestamp;
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

const AnomalyTrend = ({ data = [] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="timestamp"
          tickFormatter={formatTimestamp}
        />

        <YAxis />

        <Tooltip
          labelFormatter={(timestamp) =>
            new Date(timestamp).toLocaleString()
          }
        />

        <Line
          type="monotone"
          dataKey="anomalies"
          stroke="#1976d2"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AnomalyTrend;