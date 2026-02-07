import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top } = useSafeAreaInsets();
  const keyboardHeight = useSharedValue(0);
  const progress = useSharedValue(0);

  useKeyboardHandler({
    onMove: (event) => {
      "worklet";
      keyboardHeight.value = event.height;
      progress.value = event.progress;
    },
  });

  const keyboardSpacerStyle = useAnimatedStyle(() => {
    "worklet";
    // 20 => Initial spacing value (when keyboard is closed)
    // 0 => Final spacing value (when keyboard is open)
    const baseHeight = interpolate(progress.value, [0, 1], [20, 0]);
    return { height: keyboardHeight.value + baseHeight };
  });

  return (
    <Pressable
      style={{ ...styles.container, paddingTop: top }}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Text style={styles.title}>Keyboard handling</Text>
      <Text style={styles.subtitle}>Focus input to show keyboard</Text>
      <TextInput
        style={styles.input}
        placeholder="Type something"
        placeholderTextColor="#808080"
      />
      <View style={styles.spacer} />

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Iniciar sesion</Text>
      </Pressable>
      <Animated.View style={keyboardSpacerStyle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#A6FF00",
    padding: 10,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#2A2A2A",
    fontSize: 16,
    fontWeight: "600",
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  spacer: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
