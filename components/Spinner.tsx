import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
    </div>
  );
};

export default Spinner;
