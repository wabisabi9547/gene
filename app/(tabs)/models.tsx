import ModelList from "@/components/models/model-list";
import { Box } from "@/components/ui/box";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModelsScreen() {
    return (
        <ScrollView className="flex-1">
            <SafeAreaView className="p-4">
                <Box className="grid gap-1 pb-4">
                    <Text className="font-semibold text-2xl">Models</Text>
                    <Text className="text-sm text-gray-600">모델을 설정하고, 오프라인에서도 AI 기능을 사용하세요.</Text>
                </Box>
                <ModelList />
            </SafeAreaView>
        </ScrollView>
    )
}