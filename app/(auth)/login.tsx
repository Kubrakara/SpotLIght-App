import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function Login() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("QAuth error", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandSection}>
        <Ionicons name="leaf" size={32} color={COLORS.primary} />
        <Text style={styles.appName}>Spotlight</Text>
        <Text style={styles.tagline}>Don't miss anything</Text>
      </View>

      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/FOMO-bro.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>or</Text>
      </View>
    </View>
  );
}
