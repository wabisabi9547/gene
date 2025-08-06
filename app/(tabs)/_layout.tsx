import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 60,
                paddingBottom: 8,
                paddingTop: 8
            }
        }}>
            <Tabs.Screen 
                name="index" 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubble" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen 
                name="todos" 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}