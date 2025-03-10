import { tokenCache } from "@/cache";
import { ConvexReactClient } from "convex/react";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import React from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

export default function ClerckAndConvexProviders({children}: {children: React.ReactNode}) {
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
  });

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <ClerkLoaded>{children}</ClerkLoaded>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
