import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { MODEL_LIST } from "@/constants/models";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useRef } from "react";

export default function ModelDownloadScreen() {
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const model = MODEL_LIST[id as keyof typeof MODEL_LIST];

    const [progress, setProgress] = useState(0);
    const [downloading, setDownloading] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startDownload = () => {
        if (downloading) return;
        setDownloading(true);
        setProgress(0);
        timerRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timerRef.current as NodeJS.Timeout);
                    setDownloading(false);
                    return 100;
                }
                return prev + 2;
            });
        }, 60);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        }
    }, []);

    const handleBack = () => {
       router.replace("/(tabs)/models") 
    }

    return (
        <SafeAreaView className="px-4 gap-3 flex-1">
            <TouchableOpacity onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#A5A5A5" />
            </TouchableOpacity>
            <Box className="flex-1 flex justify-center items-center gap-6">
                {/* Model title */}
                <Text className="font-semibold text-xl text-slate-800">{model.name}</Text>

                {/* Progress Bar */}
                {(downloading || progress > 0) && (
                    <View className="w-full max-w-lg">
                        <View className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <View className="h-full bg-slate-800" style={{ width: `${progress}%` }} />
                        </View>
                        <Text className="text-center text-xs text-slate-500 mt-2">{progress}%</Text>
                    </View>
                )}

                {/* Download button */}
                <Button disabled={downloading || progress === 100} onPress={startDownload}>
                    <Text className="text-white">
                        {progress === 100 ? 'Downloaded' : downloading ? 'Downloading...' : 'Download'}
                    </Text>
                </Button>
            </Box>
        </SafeAreaView>
    )
}