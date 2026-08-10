import { Incident } from "@/app/types/types";
import { INCIDENT_STEPS as STEPS } from '@/lib/constants';

const IncidentTimeline = ({ incident }: { incident: Incident }) => {
  const currentIndex = STEPS.indexOf(incident.status);

  return (
  <div className="flex flex-col gap-4">
    {/* Timeline */}
    <div className="relative">

      {/* Background line */}
      <div className="absolute top-[6px] left-0 right-0 h-px bg-slate-300 dark:bg-slate-700" />

      {/* Active line */}
      <div
        className="absolute top-[6px] left-0 h-px bg-indigo-600 transition-all duration-500"
        style={{
          width: `${(currentIndex / (STEPS.length - 1)) * 100}%`,
        }}
      />

      {/* Steps */}
      <div className="relative flex justify-between">
        {STEPS.map((step, i) => {
          const isDone = i < currentIndex;
          const isCurrent = i === currentIndex;

          return (
            <div
              key={step}
              className="flex flex-col items-center"
            >
              <div
                className={`
                  w-4 h-4 rounded-full border-2 z-10 transition-all duration-300
                  ${
                    isDone || isCurrent
                      ? "bg-indigo-600 border-indigo-600"
                      : "dark:bg-slate-900 bg-slate-200 dark:border-slate-600 border-slate-300"
                  }
                  ${isCurrent ? "ring-4 ring-indigo-500/25 animate-pulse" : ""}
                `}
              />

              <span
                className={`
                  mt-3 text-[8px] uppercase font-mono tracking-widest whitespace-nowrap
                  ${
                    isDone || isCurrent
                      ? "text-indigo-400"
                      : "text-slate-600"
                  }
                `}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>

  </div>
);
};

export default IncidentTimeline;