import { homepageSansFontClass, homepageShellClass } from "@/features/styles";
import { SKILL_CATALOG, type SkillEntry } from "@/features/skills/data";
import { Tooltip } from "@/components/ui/tooltip-card";
import { cn } from "@/utils/cn";

function punctuationAfter(index: number, total: number) {
  if (index === total - 1) return ".";
  if (index === total - 2) return total === 2 ? " and " : ", and ";

  return ", ";
}

function SkillTerm({ skill }: { skill: SkillEntry }) {
  return (
    <Tooltip content={skill.tooltip} containerClassName="align-baseline">
      <span className="relative inline cursor-pointer text-inherit [text-decoration:none] after:pointer-events-none after:absolute after:right-[0.06em] after:bottom-[-0.3em] after:left-[0.06em] after:content-[''] after:border-dotted after:border-b-[3px] after:border-neutral-300 after:transition-colors after:duration-100 hover:after:border-neutral-900">
        {skill.name}
      </span>
    </Tooltip>
  );
}

export function SkillsSection() {
  return (
    <section
      aria-labelledby="skills-technologies"
      className={cn(
        homepageSansFontClass,
        "bg-transparent py-[clamp(56px,8vw,132px)]",
      )}
    >
      <div className={homepageShellClass}>
        <div className="mx-auto grid w-full max-w-328 gap-[clamp(10px,1.4vw,16px)] px-2 sm:px-4 md:px-6 lg:px-8">
          <h2
            id="skills-technologies"
            className="mb-10 text-6xl tracking-tight font-semibold text-neutral-950 md:mb-12 md:text-8xl"
          >
            Skills & Technologies
          </h2>

          <div className="grid">
            {SKILL_CATALOG.map((row, rowIndex) => (
              <div
                key={row.label}
                className={cn(
                  "grid gap-6 border-b border-neutral-200 pb-12 md:grid-cols-[minmax(160px,28%)_minmax(0,1fr)] md:gap-10 md:pb-16",
                  rowIndex === 0 ? "pt-0" : "pt-8 md:pt-10",
                )}
              >
                <p className="[font-family:var(--font-dm-mono)] text-[13px] tracking-[0.14em] text-[#7e8087]">
                  {row.label}
                </p>
                <div className="max-w-[44ch] text-xl leading-[1.3] tracking-[-0.01em] text-[#09090a] md:text-2xl">
                  {row.skills.map((skill, skillIndex) => (
                    <span key={`${row.label}-${skill.name}`}>
                      <SkillTerm skill={skill} />
                      {punctuationAfter(skillIndex, row.skills.length)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
