import { Gamepad2 } from "lucide-react";

export function Logo() {
  return (
    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 animate-float">
      <Gamepad2 className="w-8 h-8 text-white" />
    </div>
  );
}
