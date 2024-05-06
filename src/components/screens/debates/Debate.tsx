import DebateItems from "@/components/ui/debate/DebateItems";
import { IDebateData } from "@/interfaces/debates.interface";

export default function Debate({ debate }: IDebateData) {
  return (
    <div>
      <DebateItems debate={debate} />
    </div>
  );
}
