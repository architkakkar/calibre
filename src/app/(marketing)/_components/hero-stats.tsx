type HeroStat = {
  label: string;
  value: string;
  helper?: string;
};

const heroStats: HeroStat[] = [
  { label: "Members worldwide", value: "120K+" },
  { label: "Avg. active streak", value: "9.4 days" },
  { label: "Faster progression", value: "2.3x", helper: "vs. self-guided" },
];

function StatCard({ label, value, helper }: HeroStat) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <div className="text-xl font-semibold text-foreground">{value}</div>
      {helper ? (
        <p className="text-xs text-muted-foreground">{helper}</p>
      ) : null}
    </div>
  );
}

export function HeroStats() {
  return (
    <div className="mt-3 rounded-xl border border-border/70 bg-background/70 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-5">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Progress snapshot
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] text-destructive font-medium">
          <span className="size-1.5 rounded-full bg-destructive animate-pulse" />
          Updated today
        </span>
      </div>
      <div className="grid gap-3 px-4 pb-4 sm:grid-cols-3">
        {heroStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            helper={stat.helper}
          />
        ))}
      </div>
    </div>
  );
}
