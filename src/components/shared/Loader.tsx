const Loader = ({ wdth, hgt }: { wdth: number; hgt: number }) => {
  return (
    <div className="flex-center w-full">
      <img
        src="/assets/icons/loader.svg"
        alt="Loader"
        width={wdth}
        height={hgt}
      />
    </div>
  );
};

export default Loader;
