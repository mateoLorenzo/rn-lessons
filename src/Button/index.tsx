import React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DEFAULT_ACTIVE_OPACITY = 0.7;
const DEFAULT_ANIMATION_DURATION = 125;

interface ButtonProps extends Omit<PressableProps, "style" | "children"> {
  children: React.ReactNode;
  disabled?: boolean;
  activeOpacity?: number;
  animationDuration?: number;
  style?: StyleProp<ViewStyle>;
}

export const Button = ({
  children,
  onPress,
  disabled = false,
  activeOpacity = DEFAULT_ACTIVE_OPACITY,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  style,
  ...props
}: ButtonProps) => {
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    opacity.value = withTiming(activeOpacity, {
      duration: animationDuration,
    });
  };

  const handlePressOut = () => {
    opacity.value = withTiming(1, { duration: animationDuration });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      {...props}
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
};
