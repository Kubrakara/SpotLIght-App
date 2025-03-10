import { Image, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View>
      <Link href={"/Notifications"}> Feed Screen in Tabs </Link>
    </View>
  );
}
