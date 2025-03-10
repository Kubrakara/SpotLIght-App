import React from "react";
import { Tabs } from "expo-router";
import Iconicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
          backgroundColor: "black",
          elevation: 0,
          shadowOpacity: 0,
          height: 40,
          paddingBottom: 8,
          position: "absolute",
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Iconicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Bookmarks"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Iconicons name="bookmarks" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Create"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Iconicons name="add-circle" size={size} color={COLORS.primary} />
          ),
        }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Iconicons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Iconicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
