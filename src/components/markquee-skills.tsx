import { cn } from "~/lib/utils";

export const TechCard = ({
  icon,
  name,
  color,
}: {
  icon: string;
  name: string;
  color: string;
}) => {
  return (
    <div
      className={cn(
        "relative mx-2 flex h-24 w-24 flex-col items-center justify-center rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <i className={`${icon} text-4xl ${color}`}></i>
      <p className="mt-2 text-xs font-medium dark:text-white">{name}</p>
    </div>
  );
};
