"use client";
import * as React from "react";
import { examples } from "@/lib/parseEvent.examples";
import { parseEvent } from "@/lib/parseEvent";
import { Button } from "@/components/ui/button";

const Page = () => {
  // random and previous index
  const [index, setIndex] = React.useState(0);
  const [previosIndex, setPreviousIndex] = React.useState(0);

  // get example and event
  const example = examples[index];
  const event = parseEvent(example);

  // handle click
  const handleClick = () => {
    setPreviousIndex(index);
    setIndex(Math.floor(Math.random() * examples.length));
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-4xl">parseEvent Examples</h1>
      <div className="flex space-x-4">
        <Button onClick={() => setIndex(previosIndex)}>Previous</Button>
        <Button onClick={handleClick}>Random</Button>
      </div>
      <pre className="rounded border p-4">
        <code>{example}</code>
      </pre>
      <pre className="rounded border p-4">
        <code>{JSON.stringify(event, undefined, 2)}</code>
      </pre>
    </div>
  );
};

export default Page;
