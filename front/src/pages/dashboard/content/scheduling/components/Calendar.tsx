import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import dayjs from "dayjs";
import { Scheduling } from "../../../../../types/scheduling";
import { Select } from "flowbite-react";

interface CalendarProps {
  schedulings: Scheduling[];
  openModalDetails: (scheduling: Scheduling[]) => void;
  barbershopsData: {
    id: number;
    name: string;
  }[];
}

const Calendar: React.FC<CalendarProps> = ({ schedulings, openModalDetails, barbershopsData }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedBarbershop, setSelectedBarbershop] = useState<number | null>(null);

  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));
  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = endOfMonth.date();

  const startOfWeek = startOfMonth.startOf("week");

  const totalDays = 42; 

  const daysArray = Array.from({ length: totalDays }, (_, i) =>
    startOfWeek.add(i, "day")
  );

  const getSchedulingsForDate = (date: dayjs.Dayjs) =>
    schedulings.filter(
      (s) =>
        dayjs(s.startTime).isSame(date, "day") &&
        dayjs(s.startTime).isSame(date, "month") &&
        (selectedBarbershop ? s.barbershopId === selectedBarbershop : true)
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="text-gray-600 hover:scale-150 transition-transform duration-180"
        >
          <ChevronLeft size={30} />
        </button>
        <h2 className="text-lg font-semibold">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button
          onClick={nextMonth}
          className="text-gray-600 hover:scale-150 transition-transform duration-180"
        >
          <ChevronRight size={30} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}

        {daysArray.map((date) => {
          const dailySchedulings = getSchedulingsForDate(date);

          // Verificar se o dia pertence ao mês atual
          const isCurrentMonth = date.month() === currentDate.month();

          return (
            <div
              key={date.toString()}
              className={`aspect-square border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                isCurrentMonth ? "" : "bg-gray-50"
              }`}
              onClick={() => openModalDetails(dailySchedulings)}
            >
              <div className="text-sm text-gray-600 p-1">{date.date()}</div>

              {dailySchedulings.length > 0 && (
                <div className="bg-blue-100 text-blue-800 text-xs rounded p-2 mt-1 mb-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span className="truncate w-full">
                      {dailySchedulings.length} agendamento(s)
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-7 flex justify-end">
        <Select
          id="barbershopSelect"
          onChange={(e) => setSelectedBarbershop(Number(e.target.value))}
          value={selectedBarbershop ?? ""}
        >
          <option value="">Todas as Barbearias</option>
          {barbershopsData.map((barbershop) => (
            <option key={barbershop.id} value={barbershop.id}>
              {barbershop.name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Calendar;
