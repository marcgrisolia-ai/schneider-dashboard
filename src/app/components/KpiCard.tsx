import { motion } from "motion/react";

interface KpiCardProps {
  label: string;
  value: string | number;
  subtext: string;
  progress: number;
  numericValue?: number;
}

export function KpiCard({ label, value, subtext, progress, numericValue }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-[#DDE7DE] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <div className="text-[11px] tracking-wider uppercase text-[#5E6B63] mb-3 font-medium">
        {label}
      </div>
      <motion.div
        className="text-[32px] font-bold text-[#1F2A24] mb-1"
        style={{ fontFamily: 'Sora, sans-serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {numericValue !== undefined ? (
          <AnimatedNumber
            value={numericValue}
            progress={progress}
            format={typeof value === 'string' ? value : undefined}
          />
        ) : (
          value
        )}
      </motion.div>
      <div className="text-[12px] text-[#5E6B63]">
        {subtext}
      </div>
    </motion.div>
  );
}

function AnimatedNumber({ value, progress, format }: { value: number; progress: number; format?: string }) {
  const isPercentage = format?.includes('%');
  const animatedValue = value * progress;
  const output = isPercentage ? `${animatedValue.toFixed(1)}%` : Math.round(animatedValue);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {output}
    </motion.span>
  );
}
