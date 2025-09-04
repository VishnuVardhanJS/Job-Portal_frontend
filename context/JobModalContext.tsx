"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type JobModalContextType = {
  opened: boolean;
  open: () => void;
  close: () => void;
};

const JobModalContext = createContext<JobModalContextType | undefined>(
  undefined
);

export function JobModalProvider({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);

  const open = () => setOpened(true);
  const close = () => setOpened(false);

  return (
    <JobModalContext.Provider value={{ opened, open, close }}>
      {children}
    </JobModalContext.Provider>
  );
}

export function useJobModal() {
  const ctx = useContext(JobModalContext);
  if (!ctx) throw new Error("useJobModal must be used within JobModalProvider");
  return ctx;
}
