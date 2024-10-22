import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectBlockProps = {
  options: { value: string; label: string; path?: string }[];
  onChangeOption: (value: string) => void;
  value: string;
};

const SelectBlock = ({ options, onChangeOption }: SelectBlockProps) => {
  return (
    <Select onValueChange={(value) => onChangeOption(value)}>
      <SelectTrigger className="max-w-[135px] flex gap-1 border-bright-4 dark:border-dark-4">
        <SelectValue placeholder="First newest" />
      </SelectTrigger>
      <SelectContent
        className="bg-bright-3 dark:bg-dark-3"
        // onChange={() => onChangeOption(value as "asc" | "desc")}
      >
        {options.map(({ value, label, path }) => (
          <SelectItem
            key={value}
            value={value}
            className="cursor-pointer hover:bg-bright-4 hover:dark:bg-dark-4 rounded-md"
            // onClick={() => onChange(value as "asc" | "desc")}
          >
            <div className="flex gap-2">
              <p className="uppercase test-sm md:text-[12px] font-medium">
                {label}
              </p>
              <img src={path} alt="filter" width={14} height={14} />
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBlock;
