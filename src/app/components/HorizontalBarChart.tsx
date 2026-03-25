import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from 'recharts';

interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface HorizontalBarChartProps {
  data: DataItem[];
  progress: number;
}

export function HorizontalBarChart({ data, progress }: HorizontalBarChartProps) {
  const displayData = data.map((item, index) => {
    const delayed = normalizeProgress(progress, index * 0.06, 0.72);
    const eased = easeOutCubic(delayed);
    return { ...item, value: item.value * eased };
  });
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="bg-white rounded-2xl border border-[#DDE7DE] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] h-full">
      <h3 className="text-[16px] font-bold mb-6 text-[#1F2A24]" style={{ fontFamily: 'Sora, sans-serif' }}>
        Ranking by Volume
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={displayData}
          layout="vertical"
          margin={{ top: 5, right: 40, left: 100, bottom: 5 }}
        >
          <defs>
            <pattern id="ulBarPattern" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(135)">
              <rect width="8" height="8" fill="#DC143C" />
              <rect x="0" y="0" width="2" height="8" fill="#111111" />
            </pattern>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            horizontal={true}
            vertical={false}
            stroke="#E8EEE9"
          />
          <XAxis
            type="number"
            domain={[0, maxValue]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#5E6B63', fontSize: 11, fontFamily: 'Manrope, sans-serif' }}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#1F2A24', fontSize: 14, fontFamily: 'Manrope, sans-serif', fontWeight: 700 }}
          />
          <Bar
            dataKey="value"
            radius={[0, 8, 8, 0]}
            isAnimationActive={false}
            label={{
              position: 'right',
              fill: '#1F2A24',
              fontSize: 14,
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              formatter: (value: number) => Math.round(value)
            }}
          >
            {displayData.map((entry) => (
              <Cell key={`bar-${entry.name}`} fill={entry.name === 'UL' ? 'url(#ulBarPattern)' : entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function normalizeProgress(progress: number, delay: number, span: number): number {
  if (progress <= delay) return 0;
  return Math.min((progress - delay) / span, 1);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
