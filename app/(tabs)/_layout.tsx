import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown : false
        }}>
            <Tabs.Screen name="models" />
            <Tabs.Screen name="index" />
            <Tabs.Screen name="todos" />
        </Tabs>
    )
}