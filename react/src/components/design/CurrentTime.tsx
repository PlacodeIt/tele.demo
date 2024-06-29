import { useEffect, useState } from "react";

export default function useCurrentTime() {
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
export function useGreeting() {
  const [greeting, setGreeting] = useState<string>(getGreeting());

  useEffect(() => {
    const intervalId = setInterval(() => setGreeting(getGreeting()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  function getGreeting(): string {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18.5) {
      return "Good afternoon";
    } else if (currentHour >= 18.5 && currentHour < 24) {
      return "Good evening";
    } else {
      return "Good night";
    }
  }

  return greeting;
}