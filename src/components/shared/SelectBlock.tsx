import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SelectBlock = () => {
  return (
    <Select>
      <SelectTrigger className="max-w-[120px]">
        <SelectValue placeholder="Sort by date" />
      </SelectTrigger>
      <SelectContent className="bg-dark-3">
        <SelectItem value="date-asc">date-asc</SelectItem>
        <SelectItem value="date-dasc">date-desc</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectBlock;
