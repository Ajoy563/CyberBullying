import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CHART } from "@/data/constants";
import { ChartLegend } from "./ChartCard";

const axisProps = {
  tick: { fill: CHART.axis, fontSize: 12 },
  axisLine: false,
  tickLine: false,
};

/**
 * Stacked bar chart of scan activity.
 * `data` = [{ label, date, safe, flagged, high }] (see buildDashboardStats()).
 */
export default function ActivityBarChart({ data }) {
  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="label" {...axisProps} />
            <YAxis allowDecimals={false} {...axisProps} />
            <Tooltip
              {...CHART.tooltip}
              cursor={{ fill: "color-mix(in oklab, var(--line) 45%, transparent)" }}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.date ?? label}
            />
            <Bar dataKey="safe" name="Safe" stackId="s" fill={CHART.ok} maxBarSize={44} />
            <Bar dataKey="flagged" name="Flagged (low / medium)" stackId="s" fill={CHART.warn} maxBarSize={44} />
            <Bar dataKey="high" name="High risk" stackId="s" fill={CHART.danger} radius={[6, 6, 0, 0]} maxBarSize={44} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend
        items={[
          { name: "Safe", color: CHART.ok },
          { name: "Flagged (low / medium)", color: CHART.warn },
          { name: "High risk", color: CHART.danger },
        ]}
      />
    </div>
  );
}
