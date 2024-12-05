import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Popover } from "flowbite-react";

interface CalendarDay {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
}

interface CalendarProps {
  disabledDays?: (day: CalendarDay) => boolean;
  content?: React.ReactNode;
  handleLoadAvailableTimes: (date: Date) => void;
}

export const Calendar = ({ disabledDays, content, handleLoadAvailableTimes }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCollapsed] = useState(false);

  const today = new Date();

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  const isDayDisabled = (day: CalendarDay) => {
    const date = new Date(day.year, day.month, day.day);

    if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return true;

    if (disabledDays && disabledDays(day)) return true;

    return false;
  };

  const getCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDaysInCurrentMonth = daysInMonth(month, year);

    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const totalDaysInPrevMonth = daysInMonth(prevMonth, prevYear);

    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    const days: CalendarDay[] = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = totalDaysInPrevMonth - i;
      days.push({
        day,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
      });
    }

    for (let day = 1; day <= totalDaysInCurrentMonth; day++) {
      days.push({ day, month, year, isCurrentMonth: true });
    }

    const totalDaysInCalendar = Math.ceil(days.length / 7) * 7;
    for (let i = 1; days.length < totalDaysInCalendar; i++) {
      days.push({
        day: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  // const toggleCollapse = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

  const handleDayClick = (day: CalendarDay) => {
    if (isDayDisabled(day)) return;
    const date = new Date(day.year, day.month, day.day);
    setSelectedDate(date);
    handleLoadAvailableTimes(date);
    if (!day.isCurrentMonth) {
      setCurrentDate(new Date(day.year, day.month, 1));
    }
  }


  const changeMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === "prev" ? -1 : 1));

    if (newDate < new Date(today.getFullYear(), today.getMonth(), 1)) return;

    setCurrentDate(newDate);
  };

  const calendarDays = getCalendarDays();
  return (
    <div className="bg-white rounded-lg ">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-medium text-gray-800">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => changeMonth("prev")}
            className="text-gray-500 hover:text-gray-800 transition transform hover:scale-105"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => changeMonth("next")}
            className="text-gray-500 hover:text-gray-800 transition transform hover:scale-105"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
  
      {!isCollapsed && (
        <section className="flex flex-col justify-center items-center">
          <div className="w-full">
            <div className="grid gap-2 grid-cols-7 mt-6 text-center text-sm text-gray-500 font-medium">
              <div className="w-10">Dom</div>
              <div className="w-10">Seg</div>
              <div className="w-10">Ter</div>
              <div className="w-10">Qua</div>
              <div className="w-10">Qui</div>
              <div className="w-10">Sex</div>
              <div className="w-10">Sáb</div>
            </div>
            <div className="grid grid-cols-7 mt-3 gap-2">
              {calendarDays.map((day, index) => {
                const isDisabled = isDayDisabled(day);
                return !isDisabled ? (
                  <Popover trigger="click" content={content} key={index}>
                    <div
                      className={`h-10 w-10 flex items-center justify-center rounded-lg text-sm ${day.isCurrentMonth
                        ? day.day === selectedDate?.getDate() && day.month === selectedDate?.getMonth()
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                        : "text-gray-400 hover:bg-gray-200 cursor-pointer"
                        }`}
                      onClick={() => handleDayClick(day)}
                    >
                      {day.day}
                    </div>
                  </Popover>
                ) : (
                  <div
                    key={index}
                    className="h-10 w-10 flex items-center justify-center rounded-lg text-sm bg-gray-100 text-gray-400 cursor-not-allowed"
                  >
                    {day.day}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
  
}