import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const DayNavigator = ({
  today,
  today_date,
  classroom,
}: {
  today: string;
  today_date: Date;
  classroom?: string;
}) => {
  let first_day_of_week = new Date(
    today_date.getTime() - today_date.getDay() * 24 * 60 * 60 * 1000
  );

  let year = today_date.getFullYear();

  let today_month = today_date
    .toLocaleDateString("es-PE", {
      month: "short",
    })
    .replace(".", "")
    .toLocaleUpperCase();

  return (
    <div className="flex flex-col items-center px-4">
      <div className="text-sm flex space-x-2 mb-2">
        <p className="font-bold">{today_month}</p>
        <p>{year}</p>
      </div>
      <div className="flex space-x-2">
        {["D", "L", "M", "X", "J", "V", "S"].map((week_day, index) => {
          const the_date = new Date(
            first_day_of_week.getTime() + index * 24 * 60 * 60 * 1000
          )
            .toISOString()
            .split("T")[0];

          return (
            <div key={index} className="relative">
              <div
                className={cn(
                  "absolute top-1 right-1/2 translate-x-1/2 text-[0.5rem] select-none",
                  { "text-primary-foreground": the_date === today }
                )}
              >
                {week_day}
              </div>
              <Button
                variant={the_date === today ? "default" : "outline"}
                size="icon"
                data-day={the_date}
                className="rounded-full p-4"
                asChild
              >
                <Link href={`/${the_date}/` + (classroom ? classroom : "")}>
                  <span className="text-sm mt-2 font-bold">
                    {the_date.split("-")[2]}
                  </span>
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
