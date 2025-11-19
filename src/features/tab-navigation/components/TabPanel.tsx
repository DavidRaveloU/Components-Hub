import { cn } from "@/utils/cn";

interface TabPanelProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

export function TabPanel({
  children,
  className,
  isActive = true,
}: TabPanelProps) {
  if (!isActive) return null;

  return (
    <div
      className={cn(
        "w-full p-6 bg-white rounded-lg border border-gray-200 shadow-sm",
        "animate-in fade-in-0 slide-in-from-bottom-2 duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}
