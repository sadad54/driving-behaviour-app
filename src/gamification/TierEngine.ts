import { ColorValue } from "react-native";

export class TierEngine {
    static getTier(level: number) {
        if (level <=5) return {name: "Bronze", color: "#cd7f32" as ColorValue};
        if (level <=10) return {name: "Silver", color: "#c0c0c0" as ColorValue};
        if (level <=15) return {name: "Gold", color: "#ffd700" as ColorValue};
        if (level <=20) return {name: "Platinum", color: "#e5e4e2" as ColorValue};
        return {name: "Diamond", color: "#b9f2ff" as ColorValue};
    }
}