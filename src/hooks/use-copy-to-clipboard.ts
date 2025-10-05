import { useState } from "react";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedValue, setCopiedValue] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then update state if successful
    try {
      await navigator.clipboard.writeText(text);
      setCopiedValue(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedValue(null);
      return false;
    }
  };

  return [copiedValue, copy];
}

export { useCopyToClipboard };
