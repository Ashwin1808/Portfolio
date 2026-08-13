import { engineeringSkills } from "@/data/skills";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

export function StackGroups() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {engineeringSkills.map((g, i) => (
        <Reveal key={g.group} delay={Math.min(i * 50, 200)}>
          <div className="flex h-full flex-col rounded-xl border border-dark-line bg-dark-surface p-6">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-semibold text-white">{g.group}</p>
              <Badge tone="dark">Hands-on</Badge>
            </div>
            <p className="mt-1 text-[11.5px] text-dark-faint">{g.note}</p>
            <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-dark-line bg-dark-elevated px-2 py-1 font-mono text-[10.5px] text-dark-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
