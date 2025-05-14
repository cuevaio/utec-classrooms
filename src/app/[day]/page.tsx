import { FreeClassrooms } from "@/components/free-classrooms";
import { getFreeClassrooms } from "@/lib/db/queries/get-free-classrooms";

import { DayNavigator } from "@/components/day-navigator";

export default async function Day({
  params: { day },
}: {
  params: { day: string };
}) {
  let data = await getFreeClassrooms(day);

  return (
    <div className="grid grid-cols-1">
      <DayNavigator today={data.today} today_date={data.today_date} />
      <FreeClassrooms data={data} />
    </div>
  );
}

export function generateStaticParams() {
  let today = new Date();

  let start = new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000); // today - 15 days
  let end = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000); // today + 15 days

  let params: {
    day: string;
  }[] = [];

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    params.push({
      day: date.toISOString().split("T")[0],
    });
  }

  return params;
}
