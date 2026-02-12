"use client";

import AudioProvider from "./audio-provider";
import Lenis from "./lenis";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AudioProvider>
      <Lenis>
        {children}
      </Lenis>
    </AudioProvider>
  );
}
