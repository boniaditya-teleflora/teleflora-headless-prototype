"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type QueryValues = Record<string, string | undefined>;

export function usePlpQueryUpdater(defaultParams: QueryValues) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  return useCallback(
    (updates: QueryValues) => {
      const nextParams = new URLSearchParams(searchParams.toString());

      Object.entries(defaultParams).forEach(([key, value]) => {
        if (value && !nextParams.has(key)) {
          nextParams.set(key, value);
        }
      });

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          nextParams.set(key, value);
        } else {
          nextParams.delete(key);
        }
      });

      nextParams.delete("page");

      const queryString = nextParams.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    },
    [defaultParams, pathname, router, searchParams]
  );
}
