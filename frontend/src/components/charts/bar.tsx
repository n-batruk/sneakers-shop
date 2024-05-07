import {
  BarChart,
  Bar as ReBar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function Bar({
  barDataKey,
  data,
  xDataKey,
}: {
  data: any[];
  xDataKey: string;
  barDataKey: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 0,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xDataKey} className="text-xs" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <ReBar
          dataKey={barDataKey}
          className="fill-primary"
          //   activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        {/* <ReBar
          dataKey="uv"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        /> */}
      </BarChart>
    </ResponsiveContainer>
  );
}
