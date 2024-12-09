import DebateItems from "@/components/ui/debate/DebateItems";
import { IDebatesData } from "@/interfaces/debates.interface";
import { debatesService } from "@/services/debates.service";

export default function Debates({ debates }: IDebatesData) {
  // const { getAll, getById } = debatesService;

  // const data = await getAll();
  // const debate = await getById(1);

  // console.log(debate);
  // console.log(data);

  return (
    <div>
      {debates && debates.length
        ? debates.map((debate, index) => (
            <DebateItems key={index} debate={debate} />
          ))
        : "Not Found"}
    </div>
  );
}
