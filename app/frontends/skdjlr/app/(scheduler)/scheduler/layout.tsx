"use client";

import { useApp } from "@/lib/context/AppContext";
import { updateScheduledShift } from "@/lib/features/scheduledShifts/scheduledShiftsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { DragDropContext } from "@hello-pangea/dnd";
import dayjs from "dayjs";
import { Fragment, useCallback } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function SchedulerLayout({ children }: AppLayoutProps) {
  const dispatch = useAppDispatch();

  const { handleDrag, handleDrop } = useApp();

  // using useCallback is optional
  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);

  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);

  const onDragStart = useCallback(() => {
    handleDrag();
  }, [handleDrag]);

  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);

  const onDragEnd = useCallback(
    (result: any) => {
      handleDrop();
      const { source, destination, draggableId } = result;
      const [shiftId, shiftStart, shiftEnd] = draggableId.split("::");
      const shiftStartObj = dayjs(shiftStart);
      const shiftEndObj = dayjs(shiftEnd);

      // dropped outside of the scheduler grid
      if (!destination) return;

      const [destDay, destEmployeeId] = destination.droppableId.split("::");
      const destDayOfYear = dayjs(destDay).dayOfYear();
      const newShiftStart = shiftStartObj
        .dayOfYear(destDayOfYear)
        .utc()
        .toISOString();
      const newShiftEnd = shiftEndObj
        .dayOfYear(destDayOfYear)
        .utc()
        .toISOString();

      // we only care about cases where a shiftNode has been dragged into another
      // GridCell. If the cell hasn't changed, then we simply keep it where it is.
      if (destination.droppableId === source.droppableId) return;

      dispatch(
        updateScheduledShift({
          id: shiftId,
          changes: {
            start: newShiftStart,
            end: newShiftEnd,
            employeeId: destEmployeeId,
          },
        }),
      );
    },
    [dispatch, handleDrop],
  );
  /////

  //////
  return (
    <Fragment>
      <DragDropContext
        onBeforeCapture={onBeforeCapture}
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        {children}
      </DragDropContext>
    </Fragment>
  );
}
