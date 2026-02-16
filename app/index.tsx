import { Button } from "@/src/Button";
import { ButtonWithLoader } from "@/src/ButtonWithLoader";
import { colors } from "@/src/theme/colors";
import { fonts } from "@/src/theme/fonts";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top, bottom } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2500);
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: top + 40 }]}
      contentContainerStyle={{ paddingBottom: bottom + 20 }}
    >
      {/* ---- Section: Button ---- */}
      <Text style={styles.sectionTitle}>Button</Text>
      <Text style={styles.sectionSubtitle}>
        Pressable with animated opacity feedback
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Default</Text>
        <Button onPress={() => {}} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Press me</Text>
        </Button>
      </View>

      {/* ---- Section: ButtonWithLoader ---- */}
      <View style={styles.divider} />
      <Text style={styles.sectionTitle}>ButtonWithLoader</Text>
      <Text style={styles.sectionSubtitle}>
        Animated transitions between states
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Interactive — tap to load</Text>
        <ButtonWithLoader onPress={simulateLoading} isLoading={isLoading}>
          Iniciar sesion
        </ButtonWithLoader>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: fonts.funnelDisplay.bold,
    color: colors.neutral.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: fonts.inter.regular,
    color: colors.neutral.textSecondary,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.neutral.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  label: {
    fontSize: 13,
    fontFamily: fonts.inter.medium,
    color: colors.neutral.textSecondary,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral.border,
    marginVertical: 24,
  },
  primaryButton: {
    backgroundColor: colors.accent.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: colors.accent.neutralDark,
    fontSize: 16,
    fontFamily: fonts.funnelDisplay.semiBold,
  },
  disabledButton: {
    backgroundColor: colors.neutral.overlayAccent,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButtonText: {
    color: colors.neutral.surface,
    fontSize: 16,
    fontFamily: fonts.funnelDisplay.semiBold,
  },
});
