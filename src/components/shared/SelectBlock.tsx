import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectBlockProps = {
  options: { value: string; label: string }[];
};

const SelectBlock = ({ options }: SelectBlockProps) => {
  return (
    <Select>
      <SelectTrigger className="max-w-[135px] flex gap-1">
        <SelectValue placeholder="Sort by date" />
      </SelectTrigger>
      <SelectContent className="bg-dark-3">
        {options.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBlock;
