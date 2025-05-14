"use client";

import * as React from "react";

import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useLocalStorage } from "usehooks-ts";

export const DynamicForFreeClassrooms = () => {
  const [showM, setShowM] = useLocalStorage("showM", false);
  const [showL, setShowL] = useLocalStorage("showL", false);

  React.useEffect(() => {
    let now = new Date();
    let limaDateTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      timeZone: "America/Lima",
    });

    let item_trigger = document.querySelector(
      `[data-item="${limaDateTime}"]`
    ) as HTMLButtonElement;

    item_trigger?.click();
  }, []);

  React.useEffect(() => {
    let accordion = document.querySelector("#accordion") as HTMLDivElement;

    if (accordion) {
      if (showM) {
        accordion.dataset.showM = "true";
      } else {
        accordion.dataset.showM = "false";
      }
    }
  }, [showM]);

  React.useEffect(() => {
    let accordion = document.querySelector("#accordion") as HTMLDivElement;

    if (accordion) {
      if (showL) {
        accordion.dataset.showL = "true";
      } else {
        accordion.dataset.showL = "false";
      }
    }
  }, [showL]);

  return (
    <div className="flex gap-4 mt-4 w-full justify-center">
      <div className="flex items-center space-x-2">
        <Switch id="m-toggle" checked={showM} onCheckedChange={setShowM} />
        <Label htmlFor="m-toggle">M</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="l-toggle" checked={showL} onCheckedChange={setShowL} />
        <Label htmlFor="l-toggle">L</Label>
      </div>
    </div>
  );
};
