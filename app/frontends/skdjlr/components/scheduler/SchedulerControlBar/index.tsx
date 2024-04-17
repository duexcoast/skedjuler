import { Button } from "@/components/ui/button";
import { useScheduler } from "@/context/SchedulerProvider/SchedulerContextProvider";
import dayjs, { Dayjs } from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SchedulerSelector from "../ScheduleSelector";

type DayCellProps = {
  week: Dayjs[];
};

export default function SchedulerControlBar({ week }: DayCellProps) {
  const { weekIndex, setWeekIndex } = useScheduler();

  // If the first and last day of the week are not in the same month then we will
  // conditionally render the name of the month twice, other wise just once
  // e.g. `April 7th - 13th` vs. `April 28th - May 4th`
  const firstDay = week[0];
  const lastDay = week[6];

  function handlePrevWeek() {
    setWeekIndex(weekIndex - 1);
  }

  function handleNextWeek() {
    setWeekIndex(weekIndex + 1);
  }
  function handleToday() {
    setWeekIndex(dayjs().week());
  }

  return (
    <div className="flex flex-row justify-between items-center pb-4">
      <SchedulerSelector />
      <div className="flex flex-row justify-between gap-4 items-center ">
        {/* TODO: Clean up this snippet. Too messy/repetitive */}
        <h3 className="font-semibold text-lg px-4">
          {firstDay.isSame(lastDay, "month")
            ? `${firstDay.format("MMMM D")} - ${lastDay.format("D")}`
            : `${firstDay.format("MMMM D")} - ${lastDay.format("MMMM D")}`}
        </h3>
        <Button size="sm" onClick={handleToday}>
          Today
        </Button>
        <div className="flex gap-4">
          <Button size="sm" onClick={handlePrevWeek}>
            <ChevronLeft />
          </Button>
          <Button size="sm" onClick={handleNextWeek}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
