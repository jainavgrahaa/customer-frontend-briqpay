import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

const AppointmentCalendar = ({selectedDate, setSelectedDate, setSelectedTimeSlot}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        disablePast
        dayOfWeekFormatter={(day) => day}
        onChange={e => {
          setSelectedDate(dayjs(e))
          setSelectedTimeSlot(null)
        }}
        defaultValue={selectedDate}
      />
    </LocalizationProvider>
  );
};

export default AppointmentCalendar;
