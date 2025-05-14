import { DayNavigator } from "@/components/day-navigator";
import { FreeClassrooms } from "@/components/free-classrooms/index";
import { getFreeClassrooms } from "@/lib/db/queries/get-free-classrooms";

export default async function Home() {
  let now = new Date();
  let limaDateTime = now.toLocaleDateString("en-US", {
    timeZone: "America/Lima",
  });

  let [today_month, today_day, today_year] = limaDateTime.split("/");
  today_month = today_month.padStart(2, "0");
  today_day = today_day.padStart(2, "0");

  let data = await getFreeClassrooms(
    `${today_year}-${today_month}-${today_day}`
  );

  return (
    <div className="grid grid-cols-1 gap-6">
      <DayNavigator today={data.today} today_date={data.today_date} />
      <FreeClassrooms data={data} />
    </div>
  );
}

export const revalidate = 3600;
