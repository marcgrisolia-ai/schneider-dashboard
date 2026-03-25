import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DataItem[];
  progress: number;
}

export function DonutChart({ data, progress }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const eased = easeOutCubic(progress);
  const revealedValue = total * eased;
  let accumulated = 0;

  const segmentedData = data.map(item => {
    const visibleValue = clamp(revealedValue - accumulated, 0, item.value);
    accumulated += item.value;
    return { ...item, value: visibleValue };
  });

  const remaining = Math.max(total - revealedValue, 0);
  const chartData = [...segmentedData, { name: '__remaining__', value: remaining, color: 'rgba(0,0,0,0)' }];
  const displayTotal = Math.round(revealedValue);

  return (
    <div className="bg-white rounded-2xl border border-[#DDE7DE] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] h-full">
      <h3 className="text-[16px] font-bold mb-6 text-[#1F2A24]" style={{ fontFamily: 'Sora, sans-serif' }}>
        Distribution by Certifier
      </h3>
      <div className="flex items-center justify-between gap-8">
        <div
          className="relative flex-1 max-w-[280px]"
          style={{
            opacity: 0.2 + eased * 0.8,
            transform: `scale(${0.92 + eased * 0.08})`,
            transformOrigin: 'center center',
          }}
        >
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <defs>
                <pattern id="ulPiePattern" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(135)">
                  <rect width="8" height="8" fill="#DC143C" />
                  <rect x="0" y="0" width="2" height="8" fill="#111111" />
                </pattern>
              </defs>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={false}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={`pie-${entry.name}`}
                    fill={entry.name === 'UL' ? 'url(#ulPiePattern)' : entry.color}
                    stroke={entry.name === '__remaining__' ? 'rgba(0,0,0,0)' : '#ffffff'}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="text-[48px] font-bold text-[#1F2A24]"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              {displayTotal}
            </div>
            <div className="text-[11px] text-[#5E6B63] uppercase tracking-wider text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Total<br />Certifications
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          {data.map((item, index) => {
            const percentage = total > 0 ? (item.value / total * 100).toFixed(1) : '0.0';
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={
                      item.name === 'UL'
                        ? {
                            background: 'repeating-linear-gradient(135deg, #DC143C 0 6px, #111111 6px 8px)',
                            border: '1px solid #7D0E24',
                          }
                        : { backgroundColor: item.color }
                    }
                  />
                  <span className="text-[14px] font-bold text-[#1F2A24]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {item.name}
                  </span>
                </div>
                <span className="text-[14px] font-bold text-[#5E6B63]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}
