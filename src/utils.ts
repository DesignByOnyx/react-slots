import React, { ReactNode, isValidElement, createContext } from "react";

export const PARENT_SLOT_CTX = "___parentSlotCtx";
export const DEFAULT_SLOT_NAME = "default";

export const SlotContext = createContext({} as SlotDict);

export type SlotDict = {
    [PARENT_SLOT_CTX]: SlotDict | undefined;
    [DEFAULT_SLOT_NAME]: ReactNode[];
    [slotName: string]: React.FC | ReactNode | ReactNode[];
  };

  /** Crawl up the context tree until we find a matching slot name */
export const getSlotContent = (clotCtx: SlotDict, name: string) => {
    let ctx: SlotDict | undefined = clotCtx
    while(ctx) {
        if(ctx.hasOwnProperty(name)) {
            return ctx[name]
        }
        ctx = ctx[PARENT_SLOT_CTX]
    }
}
