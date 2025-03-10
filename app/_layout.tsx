import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "@/components/InitialLayout";
import ClerckAndConvexProviders from "@/providers/ClerckAndConvexProviders";

export default function RootLayout() {
  return (
    <ClerckAndConvexProviders>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerckAndConvexProviders>
  );
}
