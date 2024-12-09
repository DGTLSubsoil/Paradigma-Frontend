"use client";

import HistoryDebatesItems from "@/components/ui/debate/HistoryDebatesItems";
import { useHistoryDebates } from "@/hooks/useHistoryDebates";

export default function HistoryDebates() {
  const {items} = useHistoryDebates()
  
  return <div>{items && <HistoryDebatesItems data={items}  />}</div>;
}
