import React from "react";

import { useSID } from "../../hooks/useSID";
import type { ActiveTool } from "../../hooks/useTools";
import { useTools } from "../../hooks/useTools";
import Dialog from "../../ui/dialog";
import Button from "../Button";
import { Switch } from "../Switch";

export const ToolsDialog: React.FC<{
  show: boolean;
  setOpen: (boolean) => void;
}> = ({ show, setOpen }) => {
  const { activeTools, setToolActive, isSuccess } = useTools();

  return (
    <Dialog
      inline
      open={show}
      setOpen={setOpen}
      title="Tools"
      actions={
        <>
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </button>
        </>
      }
    >
      <p>Select what external tools your agents have access to.</p>
      <div className="mt-5 flex flex-col gap-3 ">
        {activeTools.map((tool, i) => {          
          return <GenericTool key={i} tool={tool} onChange={setToolActive} />;
        })}
        {!isSuccess && <p className="text-center text-red-300">Error loading tools.</p>}
      </div>
    </Dialog>
  );
};

interface ToolProps {
  tool: ActiveTool;
  onChange: (name: string, active: boolean) => void;
}

const GenericTool = ({ tool, onChange }: ToolProps) => {
  return (
    <div className="flex items-center gap-3 rounded-md border border-white/30 bg-zinc-800 p-2 px-4 text-white">
      <ToolAvatar tool={tool} />
      <div className="flex flex-grow flex-col gap-1">
        <p className="font-bold capitalize">{tool.name}</p>
        <p className="text-xs sm:text-sm">{tool.description}</p>
      </div>
      <Switch value={tool.active} onChange={() => onChange(tool.name, !tool.active)} />
    </div>
  );
};

const ToolAvatar = ({ tool }: { tool: ActiveTool }) => {
  if (tool.image_url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={tool.name} width="40px" height="40px" src={tool.image_url} />;
  }

  return <div className="h-10 w-10 rounded-full border border-white/30 bg-amber-600" />;
};
