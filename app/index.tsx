import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
        Useful lessons for React Native
      </Text>
      <Text>Navigate between branches</Text>
    </View>
  );
}
