import { useState, type ReactNode } from "react";
import cn from "classnames";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type Props = {
  tabs: Tab[];
  activeId?: string;
  onChange?: (id: string) => void;
};

export const Tabs = ({ tabs, activeId: controlledId, onChange }: Props) => {
  const [internalId, setInternalId] = useState(tabs[0]?.id);
  const activeId = controlledId ?? internalId;
  const setActiveId = onChange ?? setInternalId;
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div className="rounded-xl border border-line bg-main-cart shadow-sm">
      <div className="flex gap-6 border-b border-line px-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveId(tab.id)}
            className={cn(
              "relative py-4 text-sm font-medium transition",
              tab.id === active?.id
                ? "text-price-cart"
                : "text-third-text hover:text-main-text",
            )}
          >
            {tab.label}
            {tab.id === active?.id && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-price-cart" />
            )}
          </button>
        ))}
      </div>
      <div className="p-5">{active?.content}</div>
    </div>
  );
};
