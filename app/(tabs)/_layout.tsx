import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  // Get the current screen name from the pathname
  const getTasksTitle = () => {
    if (pathname.includes('pending')) return 'Tasks - Pending';
    if (pathname.includes('done')) return 'Tasks - Done';
    return 'Tasks';
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="note" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: getTasksTitle(),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="checklist.checked" color={color} />,
        }}
      />
    </Tabs>
  );
}
