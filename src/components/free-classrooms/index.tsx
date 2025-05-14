import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DynamicForFreeClassrooms } from "./dynamic";
import Link from "next/link";

export const FreeClassrooms = ({
  data,
}: {
  data: {
    free: {
      start: Date;
      end: Date;
      classrooms: string[];
    }[];
    yesterday: string;
    today: string;
    tomorrow: string;
  };
}) => (
  <>
    <Accordion
      type="single"
      collapsible
      className="w-full group"
      id="accordion"
    >
      {data.free.map(({ classrooms, start }) => (
        <AccordionItem
          key={start.toISOString()}
          value={start.toISOString()}
          className=""
        >
          <AccordionTrigger
            className="relative hover:no-underline px-4 data-[state=open]:pt-2 data-[state=open]:pb-1"
            data-item={start.toLocaleTimeString("en-US", {
              hour: "2-digit",
              timeZone: "America/Lima",
            })}
          >
            <div className=" flex justify-between w-full">
              <Badge
                variant="outline"
                className={cn("font-mono", {
                  "border-green-400/90 text-green-400/90":
                    classrooms.filter((x) => x.startsWith("A")).length > 10,
                  "border-yellow-400/90 text-yellow-400/90":
                    classrooms.filter((x) => x.startsWith("A")).length > 5 &&
                    classrooms.filter((x) => x.startsWith("A")).length <= 10,
                  "border-red-400/90 text-red-400/90":
                    classrooms.filter((x) => x.startsWith("A")).length > 0 &&
                    classrooms.filter((x) => x.startsWith("A")).length <= 5,
                  "border-muted-foreground/50 text-muted-foreground/50":
                    classrooms.filter((x) => x.startsWith("A")).length === 0,
                })}
              >
                {start.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  timeZone: "America/Lima",
                })}
              </Badge>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pt-1 pb-2 space-y-4">
            {classrooms.filter((x) => x.startsWith("A")).length && (
              <>
                <div className="flex flex-wrap gap-2 ">
                  {classrooms
                    .filter((x) => x.startsWith("A"))
                    .map((c) => (
                      <Button
                        key={c}
                        size="sm"
                        variant="secondary"
                        className={cn("tabular-nums")}
                        asChild
                      >
                        <Link
                          href={`/${start.toISOString().split("T")[0]}/${c}`}
                        >
                          {c}
                        </Link>
                      </Button>
                    ))}
                </div>
              </>
            )}

            {classrooms.filter((x) => x.startsWith("L")).length ? (
              <>
                <div className="flex-wrap gap-2 group-data-[show-L=true]:flex hidden transition-all">
                  {classrooms
                    .filter((x) => x.startsWith("L"))
                    .map((c) => (
                      <Button
                        key={c}
                        size="sm"
                        variant="secondary"
                        className={cn("tabular-nums")}
                        asChild
                      >
                        <Link
                          href={`/${start.toISOString().split("T")[0]}/${c}`}
                        >
                          {c}
                        </Link>
                      </Button>
                    ))}
                </div>
              </>
            ) : null}

            {classrooms.filter((x) => x.startsWith("M")).length ? (
              <>
                <div className="flex-wrap gap-2 group-data-[show-M=true]:flex hidden transition-all">
                  {classrooms
                    .filter((x) => x.startsWith("M"))
                    .map((c) => (
                      <Button
                        key={c}
                        size="sm"
                        variant="secondary"
                        className={cn("tabular-nums")}
                        asChild
                      >
                        <Link
                          href={`/${start.toISOString().split("T")[0]}/${c}`}
                        >
                          {c}
                        </Link>
                      </Button>
                    ))}
                </div>
              </>
            ) : null}

            {classrooms.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No hay aulas libres en este horario :0
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
    <DynamicForFreeClassrooms />
  </>
);
