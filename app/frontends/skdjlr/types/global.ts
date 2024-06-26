import { UUID } from "crypto";
import { DayOfWeek } from "@/types/constants";

export type Business = {
  id: UUID;
  name: string;
  industry: string;
  startOfWorkWeek: DayOfWeek;
  timezone: string;
  // address information
};

/** A Schedule represents a user created schedule. Schedules have names and
 * roles associated with them.
 *
 * Each Schedule has a one-to-many relationship with WeeklySchedule objects.
 *
 * The Schedule type does not contain shift information - that is stored in
 * WeeklySchedule.
 */
export type Schedule = {
  id: UUID;
  /*
   * Name of the schedule. For example, "BOH", "FOH" or "Servers"
   */
  name: string;
  /*
   * The Ids for the roles included in this schedule. This is used to determine
   * which employees are eligible for this schedule.
   */
  roles: UUID[];
  defaultShiftStart: string;
  defaultShiftEnd: string;
};

export type Role = {
  id: UUID;
  name: string;
};
export type Employee = {
  id: UUID;
  firstName: string;
  lastName: string;
  rolesId: UUID[];
  hourlyWage?: string;
  phoneNumber?: string;
  email?: string;
};

type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;

export type THourMinuteTime = `${THours}:${TMinutes}`;

export type THourMinutePeriodTuple = [number, number, string];

export type ShiftTemplate = {
  id: UUID;
  name: string;
  roleId: UUID;
  start: string; // ISO with no timezone. This is a floating time that shouldn't
  end: string; // change with DST.
  /*
   * TODO: We are going to create a pallete of selectable colors and define them
   * as CSS variables. The color field of the shift will be a const representing
   * the CSS variable. For the time being, it's just a string.
   *
   * const SHIFT_COLORS = {
   *   YELLOW: 'shift-yellow',
   *   BLUE: 'shift-blue',
   *   GREEN: 'shift-green',
   *   // etc...
   * } as const;
   */
  bgColor: string;
};

export type Shift = {
  id: UUID | "";
  employeeId: UUID;
  scheduleId: UUID;
  roleId: UUID;
  start: string; // ISO 8601 format
  end: string;
  published: boolean;
};
