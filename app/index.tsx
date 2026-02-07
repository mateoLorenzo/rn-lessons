import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Useful lessons for React Native</Text>
      <Text style={styles.subtitle}>Navigate between branches</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFFFFF",
    fontFamily: "FunnelDisplay-Medium",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
    color: "#CCCCCC",
    fontFamily: "Inter-Regular",
  },
});
