import { getXataClient } from "@/lib/db";
import { notFound } from "next/navigation";
const xata = getXataClient();
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DayNavigator } from "@/components/day-navigator";
import { Button } from "@/components/ui/button";

import { classrooms as clx } from "@/lib/classrooms";

import {
  ChevronLeftIcon,
  ComponentIcon,
  ShapesIcon,
  UserRoundIcon,
} from "lucide-react";
import Link from "next/link";

export default async function Day({
  params,
}: {
  params: { day: string; classroom: string };
}) {
  let classroom_name = params.classroom;
  let today = params.day;
  let today_date = new Date(`${today}T12:00:00.000Z`);
  let today_end = new Date(today_date.getTime() + 14 * 36e5);

  let classroom = await xata.db.classrooms
    .filter({
      name: classroom_name,
    })
    .getFirst();

  if (!classroom?.id) {
    notFound();
  }


  let eventsPage = await xata.db.events
    .select(["*", "classroom.id", "course.name", "course.code", "host.name"])
    .filter({
      $all: [
        {
          start: {
            $ge: today_date,
          },
        },
        {
          end: {
            $le: today_end,
          },
        },
        {
          classroom: classroom.id,
        },
      ],
    })
    .sort("start", "asc")
    .getPaginated({
      consistency: "eventual",
    });


  let _events: {
    start: number;
    end: number;
    data: (typeof eventsPage.records)[0] | null;
  }[] = [];



  // from 7:00 to 21:00
  let i = 7;
  while (i <= 21) {
    let existsEvent = eventsPage.records.find((e) => {
      if (!!e.end && !!e.start) {
        return (
          Number(
            e.start
              ?.toLocaleTimeString("en-US", {
                hour: "numeric",
                hour12: false,
                timeZone: "America/Lima",
              })
              .split(":")[0]
          ) === i
        );
      }
    });

    if (existsEvent) {
      let long = Math.abs(
        existsEvent.end?.getTime()! - existsEvent.start?.getTime()!
      );
      _events.push({
        start: i,
        end: i + long / 36e5,
        data: existsEvent,
      });

      i += long / 36e5;
    }

    if (!existsEvent) {
      _events.push({
        start: i,
        end: i + 1,
        data: null,
      });
      i++;
    }
  }

  return (
    <div>
      <div>
        <DayNavigator
          today={today}
          today_date={today_date}
          classroom={classroom_name}
        />
      </div>

      <div className="my-2 px-2 flex items-center space-x-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/${today}`}>
            <ChevronLeftIcon className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="font-bold text-xl">{classroom_name}</h1>
      </div>

      <div className="grid grid-rows-15 my-4 gap-1">
        {_events.map(({ start, end, data }) => (
          <div
            key={start}
            className={cn(
              "rounded-lg mx-2 border relative p-2 group",
              { "row-span-1": end - start === 0 },
              { "row-span-1": end - start === 1 },
              { "row-span-2": end - start === 2 },
              { "row-span-3": end - start === 3 },
              { "row-span-4": end - start === 4 },
              { "row-span-5": end - start === 5 },
              { "row-span-6": end - start === 6 },
              { "row-span-7": end - start === 7 },
              { "row-span-8": end - start === 8 },
              { "row-span-9": end - start === 9 },
              { "row-span-10": end - start === 10 },
              { "row-span-11": end - start === 11 },
              { "row-span-12": end - start === 12 },
              { "bg-muted text-foreground": data !== null },
              { "bg-muted/10": data === null }
            )}
            style={{
              backgroundImage:
                data === null
                  ? `repeating-linear-gradient(
                    45deg,
                    hsl(var(--muted) / 0.1),
                    hsl(var(--muted) / 0.1) 10px, 
                    hsl(var(--background)) 10px,
                    hsl(var(--background)) 20px
                  )`
                  : undefined,
            }}
          >
            <div className="absolute -top-4 left-0">
              <Badge variant="outline" className="bg-background">
                {String(start).padStart(2, "0") + ":00"}
              </Badge>
            </div>
            <div className="py-2">
              <p className="font-bold text-lg">
                {data?.name || data?.course?.name}
                <span className="text-muted-foreground">
                  {data?.course?.code && ` - ${data.course.code}`}
                </span>
              </p>

              {data?.host && (
                <div className="flex items-center">
                  <UserRoundIcon className="w-4 h-4 mr-2" />
                  <p className="text-sm">{data.host.name}</p>
                </div>
              )}

              <div className="flex items-center space-x-2">
                {data?.section && (
                  <div className="flex items-center">
                    <ComponentIcon className="w-4 h-4 mr-2" />
                    <p className="text-sm">Sección {data.section}</p>
                  </div>
                )}

                {data?.group && (
                  <div className="flex items-center">
                    <ShapesIcon className="w-4 h-4 mr-2" />
                    <p className="text-sm">Grupo {data.group}</p>
                  </div>
                )}
              </div>
            </div>
            {end === 22 && (
              <div className="absolute -bottom-4 left-0">
                <Badge variant="outline" className="bg-background">
                  {String(end).padStart(2, "0") + ":00"}
                </Badge>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  let today = new Date();

  let start = new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000); // today - 15 days
  let end = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000); // today + 15 days

  let params: {
    day: string;
    classroom: string;
  }[] = [];

  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    for (let c of clx) {
      params.push({
        day: d.toISOString().split("T")[0],
        classroom: c.name,
      });
    }
  }

  return params;
}
