'use client'

import Team from "@/features/team/features";
import TeamProviders from "@/features/team/providers";

export default function TeamID() {
  return (
    <TeamProviders>
      <Team />
    </TeamProviders>
  );
}
