import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Get the current screen name from the pathname

  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: true,
      tabBarButton: HapticTab,
      tabBarBackground: TabBarBackground,
      tabBarStyle: Platform.select({
        ios: {
        position: 'absolute',
        },
        default: {},
      }),
      }}>
      <Tabs.Screen
      name="(tasks)"
      options={{
        title: 'Tasks',
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="checklist.checked" color={color} />,
      }}
      />
      <Tabs.Screen
      name="notes"
      options={{
        title: 'Notes',
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="note" color={color} />,
      }}
      />
    </Tabs>
  );
}
