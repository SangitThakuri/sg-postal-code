import { cn } from "@/lib/utils";

interface AdBannerProps {
  slot?: string;
  className?: string;
  size?: "leaderboard" | "rectangle" | "banner";
}

const SIZE_STYLES: Record<string, string> = {
  leaderboard: "h-24 md:h-20",
  rectangle: "h-64",
  banner: "h-16",
};

export default function AdBanner({ slot = "default", className, size = "leaderboard" }: AdBannerProps) {
  return (
    <div
      className={cn(
        "w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 text-xs font-medium",
        SIZE_STYLES[size],
        className
      )}
      data-ad-slot={slot}
    >
      {/* Replace with actual AdSense code:
          <ins className="adsbygoogle" data-ad-client="ca-pub-XXXX" data-ad-slot={slot} ... /> */}
      Advertisement · {size} ({slot})
    </div>
  );
}
