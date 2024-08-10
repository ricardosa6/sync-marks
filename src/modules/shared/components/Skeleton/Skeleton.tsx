import cn from "classnames";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div
        className={cn(className, "bg-gray-200 rounded-full dark:bg-gray-700")}
      />
    </div>
  );
};
