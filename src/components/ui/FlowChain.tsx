import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

export interface FlowNode {
  node: string;
  caption?: string;
}

interface FlowChainProps {
  nodes: FlowNode[];
  tone?: "light" | "dark";
  numbered?: boolean;
}

export function FlowChain({ nodes, tone = "light", numbered = false }: FlowChainProps) {
  const reduce = useReducedMotion();
  const dark = tone === "dark";

  return (
    <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-3">
      {nodes.map((item, i) => (
        <Fragment key={item.node}>
          <motion.li
            className="min-w-0 flex-1"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0.15 : 0.5,
              delay: reduce ? 0 : 0.15 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className={`flex h-full flex-col rounded-xl border px-4 py-3.5 ${
                dark
                  ? "border-white/15 bg-white/8 backdrop-blur"
                  : "border-line bg-white shadow-[0_18px_40px_-32px_rgba(15,27,51,0.6)]"
              } ${numbered ? "relative pl-11" : ""}`}
            >
              {numbered ? (
                <span
                  className={`font-display absolute left-3.5 top-3.5 text-[11px] font-extrabold tabular-nums ${
                    dark ? "text-lekuka-bright" : "text-ibd-red"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              ) : null}
              <p
                className={`font-display text-[13.5px] font-bold leading-snug sm:text-sm ${
                  dark ? "text-white" : "text-ink"
                }`}
              >
                {item.node}
              </p>
              {item.caption ? (
                <p
                  className={`mt-1 text-[11.5px] leading-snug sm:text-xs ${
                    dark ? "text-white/55" : "text-muted"
                  }`}
                >
                  {item.caption}
                </p>
              ) : null}
            </div>
          </motion.li>

          {i < nodes.length - 1 ? (
            <li
              aria-hidden="true"
              className="flex shrink-0 items-center justify-center py-1 lg:py-0"
            >
              <span className="relative flex h-7 w-7 items-center justify-center lg:h-6 lg:w-7">
                <ArrowDown
                  className={`h-4 w-4 lg:hidden ${dark ? "text-lekuka-bright" : "text-lekuka"}`}
                />
                <ArrowRight
                  className={`hidden h-4 w-4 lg:block ${dark ? "text-lekuka-bright" : "text-lekuka"}`}
                />
                {!reduce ? (
                  <span className="absolute hidden h-1 w-1 rounded-full bg-lekuka lg:block flow-dot" />
                ) : null}
              </span>
            </li>
          ) : null}
        </Fragment>
      ))}
    </ol>
  );
}
