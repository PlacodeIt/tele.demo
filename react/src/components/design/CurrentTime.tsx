import { useEffect, useState } from "react";

export default function CurrentTime() {
  const [label, setLabel] = useState<string>(getLabel());

  useEffect(() => {
    const intervalId = setInterval(() => setLabel(getLabel()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  function getLabel(): string {
    const now = new Date();
    const [date, time] = now.toISOString().split(".")[0].split("T");

    const dateStr = date.replace(/-/g, ".");
    return dateStr + " " + time;
  }

  return label;
}

