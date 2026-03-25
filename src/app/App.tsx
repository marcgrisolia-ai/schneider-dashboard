import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { KpiCard } from './components/KpiCard';
import { DonutChart } from './components/DonutChart';
import { HorizontalBarChart } from './components/HorizontalBarChart';

const certificationData = [
  { name: 'UL', value: 23, color: '#DC143C' },
  { name: 'Bureau Veritas', value: 15, color: '#C8102E' },
  { name: 'DEKRA', value: 13, color: '#888888' },
  { name: 'BV Marine', value: 8, color: '#8B7355' },
  { name: 'DNV', value: 4, color: '#00AAD2' },
  { name: 'LCIE', value: 2, color: '#E91E63' },
  { name: 'TÜV', value: 2, color: '#0066B3' },
  { name: 'ASEFA', value: 1, color: '#2C3E50' },
];

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');
  const donutOnly = view === 'donut';
  const barsOnly = view === 'bars';
  const splitView = donutOnly || barsOnly;

  const [progress, setProgress] = useState(0);
  const [sceneOpacity, setSceneOpacity] = useState(1);
  const [sceneScale, setSceneScale] = useState(1);
  const [sceneY, setSceneY] = useState(0);
  const rafRef = useRef<number | null>(null);
  const cycleDurationMs = 40000;
  const introDurationMs = 5000;
  const fadeOutStartMs = 38200;
  const fadeDurationMs = 1200;
  const fadeInDurationMs = 900;

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) % cycleDurationMs;
      const p = Math.min(elapsed / introDurationMs, 1);
      setProgress(p);

      const fadeInOpacity = Math.min(elapsed / fadeInDurationMs, 1);
      const fadeOutProgress = elapsed >= fadeOutStartMs
        ? Math.min((elapsed - fadeOutStartMs) / fadeDurationMs, 1)
        : 0;
      const easedOut = easeInCubic(fadeOutProgress);
      const fadeOutOpacity = 1 - fadeOutProgress;
      setSceneOpacity(Math.min(fadeInOpacity, fadeOutOpacity));
      setSceneScale(1 - 0.03 * easedOut);
      setSceneY(-18 * easedOut);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="min-h-screen p-6 md:p-12"
      style={{ 
        background: splitView ? '#FFFFFF' : '#06C75A',
        fontFamily: 'Manrope, sans-serif'
      }}
    >
      <div className={`${splitView ? 'max-w-[1180px]' : 'max-w-[1600px]'} mx-auto`}>
        {!splitView && (
          <div className="mb-8 text-center">
            <h1 
              className="text-[28px] md:text-[40px] font-bold text-white mb-2 uppercase"
              style={{ 
                fontFamily: 'Sora, sans-serif',
                letterSpacing: '0.02em',
                lineHeight: '1.1',
                opacity: getTitleProgress(progress) * sceneOpacity,
                transform: `translateY(${(1 - getTitleProgress(progress)) * 18 + sceneY * 0.35}px) scale(${0.96 + getTitleProgress(progress) * 0.04})`,
                transformOrigin: 'center center',
              }}
            >
              Global Certification Coverage by Body
            </h1>
          </div>
        )}

        <div style={{ opacity: sceneOpacity, transform: `translateY(${sceneY}px) scale(${sceneScale})`, transformOrigin: 'center top' }}>
          {!splitView && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div style={getKpiCardStyle(progress, 0)}>
                <KpiCard
                  label="TOTAL CERTIFICATIONS"
                  value={68}
                  subtext="Across all bodies"
                  progress={getKpiProgress(progress, 0)}
                  numericValue={68}
                />
              </div>
              <div style={getKpiCardStyle(progress, 1)}>
                <KpiCard
                  label="TOP CERTIFIER"
                  value={23}
                  subtext="UL"
                  progress={getKpiProgress(progress, 1)}
                  numericValue={23}
                />
              </div>
              <div
                className="bg-white rounded-2xl border border-[#DDE7DE] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                style={{ ...getKpiCardStyle(progress, 2), fontFamily: 'Manrope, sans-serif' }}
              >
                <div className="text-[11px] tracking-wider uppercase text-[#5E6B63] mb-3 font-medium">
                  WORLDWIDE DISTRIBUTION
                </div>
                <div
                  className="text-[18px] md:text-[20px] font-bold text-[#1F2A24] mb-2"
                  style={{ fontFamily: 'Sora, sans-serif', letterSpacing: '-0.01em', lineHeight: '1.2' }}
                >
                  Global certification coverage
                </div>
                <div className="text-[13px] text-[#5E6B63] leading-relaxed">
                  America • Europe • Asia • Africa • Oceania
                </div>
              </div>
              <div style={getKpiCardStyle(progress, 3)}>
                <KpiCard
                  label="CERTIFYING ORGANIZATIONS"
                  value={8}
                  subtext="Distinct organizations"
                  progress={getKpiProgress(progress, 3)}
                  numericValue={8}
                />
              </div>
            </div>
          )}

          {/* Charts */}
          {!splitView && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <DonutChart data={certificationData} progress={progress} />
              <HorizontalBarChart data={certificationData} progress={progress} />
            </div>
          )}
          {donutOnly && (
            <div
              className="max-w-[980px] mx-auto rounded-2xl border border-[#DDE7DE] shadow-[0_8px_24px_rgba(17,24,39,0.08)] p-3 md:p-4"
              style={{ background: '#FFFFFF' }}
            >
              <DonutChart data={certificationData} progress={progress} />
            </div>
          )}
          {barsOnly && (
            <div
              className="max-w-[980px] mx-auto rounded-2xl border border-[#DDE7DE] shadow-[0_8px_24px_rgba(17,24,39,0.08)] p-3 md:p-4"
              style={{ background: '#FFFFFF' }}
            >
              <HorizontalBarChart data={certificationData} progress={progress} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function easeInCubic(t: number): number {
  return t * t * t;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function normalizeProgress(progress: number, delay: number, span: number): number {
  if (progress <= delay) return 0;
  return Math.min((progress - delay) / span, 1);
}

function getKpiProgress(progress: number, index: number): number {
  const normalized = normalizeProgress(progress, index * 0.08, 0.72);
  return easeOutCubic(normalized);
}

function getKpiCardStyle(progress: number, index: number): CSSProperties {
  const p = getKpiProgress(progress, index);
  const y = (1 - p) * 18;
  const s = 0.97 + p * 0.03;
  return {
    opacity: p,
    transform: `translateY(${y}px) scale(${s})`,
    transformOrigin: 'center center',
  };
}

function getTitleProgress(progress: number): number {
  return easeOutCubic(normalizeProgress(progress, 0.03, 0.55));
}
