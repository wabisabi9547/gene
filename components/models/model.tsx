import { Box } from "@/components/ui/box";
import { EvilIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

interface ModelProps {
    name : string,
    description : string,
    downloadURL : string
}

export default function Model({ name, description }: ModelProps) {
    const [downloaded, setDownloaded] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.push(`/model/${name}`)}>  
        <Box className="flex flex-row items-center justify-between gap-2 border-b border-b-slate-200 py-3">
            <Box className="flex-1">
                <Text className="font-semibold text-base text-slate-800">{name}</Text>
                <Text className="text-xs text-slate-500" numberOfLines={2}>{description}</Text>
            </Box>
            <EvilIcons name="chevron-right" size={32} color="#A5A5A5" />
        </Box>
        </TouchableOpacity>
    );
}