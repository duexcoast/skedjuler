"use client";

import { useContext, useState } from "react";
import SchedulerContext from "./SchedulerContext";
import { SchedulerProviderProps } from "./types";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { ShiftTemplate } from "@/types/global";

dayjs.extend(weekOfYear);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);

export default function SchedulerContextProvider({
  children,
}: SchedulerProviderProps) {
  const [weekIndex, setWeekIndex] = useState(dayjs().week());
  const [dayScheduleStarts, setDayScheduleStarts] = useState(4);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [defaultShiftStart, setDefaultShiftStart] = useState("11:00");
  const [defaultShiftEnd, setDefaultShiftEnd] = useState("15:00");
  const [shiftTemplates, setShiftTemplates] = useState<ShiftTemplate[]>([
    {
      id: "018ed485-4b4f-7c8f-aeee-ff631b8f97b9",
      name: "No Shift Templates Created",
      roleID: "018ed485-f042-7d1e-aaf4-9f580586c1d8",
      start: "12:00",
      end: "03:00",
      bgColor: "blue",
    },
  ]);
  return (
    <SchedulerContext.Provider
      value={{
        weekIndex,
        dayScheduleStarts,
        daySelected,
        defaultShiftStart,
        defaultShiftEnd,
        shiftTemplates,
        setDefaultShiftEnd,
        setWeekIndex,
        setDayScheduleStarts,
        setDaySelected,
        setDefaultShiftStart,
        setShiftTemplates,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}

export function useScheduler() {
  const context = useContext(SchedulerContext);
  if (!context) {
    throw new Error(
      "useScheduler must be used with a SchedulerContextProvider",
    );
  }
  return context;
}