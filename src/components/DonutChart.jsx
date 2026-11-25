import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CHART } from "@/data/constants";
import { ChartLegend } from "./ChartCard";

/**
 * Donut chart with a centre label and a custom legend.
 * `data` = [{ key, name, value }], `colors` maps key -> CSS colour.
 */
export default function DonutChart({ data, colors, centerValue, centerLabel = "Total" }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex h-full flex-col">
      <div className="relative min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={total ? data : [{ key: "empty", name: "No data", value: 1 }]}
              dataKey="value"
              nameKey="name"
              innerRadius="64%"
              outerRadius="92%"
              paddingAngle={total ? 3 : 0}
              stroke="none"
              isAnimationActive
            >
              {(total ? data : [{ key: "empty" }]).map((d) => (
                <Cell key={d.key} fill={colors[d.key] ?? "var(--line)"} />
              ))}
            </Pie>
            {total > 0 && <Tooltip {...CHART.tooltip} />}
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="font-display text-2xl font-bold text-fg">{centerValue ?? total}</p>
            <p className="text-xs text-subtle">{centerLabel}</p>
          </div>
        </div>
      </div>
      <ChartLegend items={data.map((d) => ({ name: d.name, value: d.value, color: colors[d.key] }))} />
    </div>
  );
}
