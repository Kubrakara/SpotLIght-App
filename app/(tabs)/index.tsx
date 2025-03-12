import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/auth.styles";
import { useAuth } from "@clerk/clerk-expo";

export default function Index() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Sign out successful!");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Text style={{ color: "white" }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
