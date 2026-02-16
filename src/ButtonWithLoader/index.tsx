import { Button } from "@/src/Button";
import { colors } from "@/src/theme/colors";
import { fonts } from "@/src/theme/fonts";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const DURATION = 300;
const SLIDE = 20;

interface ButtonWithLoaderProps {
  children: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  backgroundColorDisabled?: string;
  textColor?: string;
  textColorDisabled?: string;
  spinnerColor?: string;
}

export const ButtonWithLoader = ({
  children,
  onPress,
  isLoading = false,
  disabled = false,
  style,
  backgroundColor = colors.accent.primary,
  backgroundColorDisabled = colors.neutral.overlayAccent,
  textColor = colors.accent.neutralDark,
  textColorDisabled = colors.neutral.elementMid,
  spinnerColor,
}: ButtonWithLoaderProps) => {
  // 0 = disabled, 1 = enabled (loading uses same color as enabled)
  const state = useSharedValue(disabled ? 0 : 1);
  const hasLoaded = useRef(isLoading);

  const textOpacity = useSharedValue(isLoading ? 0 : 1);
  const textY = useSharedValue(isLoading ? SLIDE : 0);
  const spinnerOpacity = useSharedValue(isLoading ? 1 : 0);
  const spinnerY = useSharedValue(isLoading ? 0 : -SLIDE);

  const enterLoading = () => {
    textOpacity.value = withTiming(0, { duration: DURATION });
    textY.value = withTiming(SLIDE, { duration: DURATION });
    spinnerOpacity.value = withTiming(1, { duration: DURATION });
    spinnerY.value = withTiming(0, { duration: DURATION });
  };

  const exitLoading = () => {
    state.value = withTiming(disabled ? 0 : 1, { duration: DURATION });
    spinnerOpacity.value = withTiming(0, { duration: DURATION });
    spinnerY.value = withSequence(
      withTiming(SLIDE, { duration: DURATION }),
      withTiming(-SLIDE, { duration: 0 })
    );
    textY.value = withSequence(
      withTiming(-SLIDE, { duration: 0 }),
      withTiming(0, { duration: DURATION })
    );
    textOpacity.value = withTiming(1, { duration: DURATION });
  };

  useEffect(() => {
    if (isLoading) {
      hasLoaded.current = true;
      enterLoading();
    } else if (hasLoaded.current) {
      exitLoading();
    } else {
      state.value = withTiming(disabled ? 0 : 1, { duration: DURATION });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, disabled]);

  const buttonBgStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      state.value,
      [0, 1],
      [backgroundColorDisabled, backgroundColor]
    ),
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textY.value }],
    color: interpolateColor(
      state.value,
      [0, 1],
      [textColorDisabled, textColor]
    ),
  }));

  const spinnerStyle = useAnimatedStyle(() => ({
    opacity: spinnerOpacity.value,
    transform: [{ translateY: spinnerY.value }],
  }));

  return (
    <Button
      onPress={() => {
        enterLoading();
        onPress();
      }}
      disabled={disabled || isLoading}
      style={[styles.button, buttonBgStyle, style]}
    >
      <Animated.View style={styles.contentContainer}>
        <Animated.Text style={[styles.text, textStyle]}>
          {children}
        </Animated.Text>
        <Animated.View style={[styles.spinnerContainer, spinnerStyle]}>
          <ActivityIndicator size="small" color={spinnerColor || textColor} />
        </Animated.View>
      </Animated.View>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  contentContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: 22,
  },
  text: {
    fontFamily: fonts.funnelDisplay.semiBold,
    fontSize: 16,
    lineHeight: 22,
  },
  spinnerContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
