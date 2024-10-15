import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectBlockProps = {
  options: { value: string; label: string; path: string }[];
};

const SelectBlock = ({ options }: SelectBlockProps) => {
  return (
    <Select>
      <SelectTrigger className="max-w-[135px] flex gap-1 border-dark-4 dark:border-bright-4">
        <SelectValue placeholder="Sort by date" />
      </SelectTrigger>
      <SelectContent className="bg-dark-3 dark:bg-bright-3">
        {options.map(({ value, label, path }) => (
          <SelectItem
            key={value}
            value={value}
            className="cursor-pointer hover:bg-dark-4 dark:hover:bg-bright-4 rounded-md"
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
