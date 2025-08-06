import { Box } from "@/components/ui/box";
import { MODEL_LIST } from "@/constants/models";
import Model from "./model";

export default function ModelList() {
    return (
        <Box className="flex-1">
            {
                Object.entries(MODEL_LIST).map(([key, model]) => (
                    <Model key={key} {...model} />
                ))
            }
        </Box>
    )
}