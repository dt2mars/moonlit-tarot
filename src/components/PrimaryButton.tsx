import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: PrimaryButtonProps) {
  const isPrimary = variant === 'primary';
  const secondaryVariantStyle =
    variant === 'danger' ? styles.danger : variant === 'ghost' ? styles.ghost : styles.secondary;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.shell,
        style,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
      ]}
    >
      {isPrimary ? (
        <LinearGradient
          colors={disabled ? ['#555160', '#4B4655'] : ['#F1D58A', '#B98AE5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fill}
        >
          <Text numberOfLines={2} style={[styles.text, styles.primaryText]}>
            {title}
          </Text>
        </LinearGradient>
      ) : (
        <View style={[styles.fill, secondaryVariantStyle]}>
          <Text
            numberOfLines={2}
            style={[styles.text, variant === 'danger' ? styles.dangerText : styles.secondaryText]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: '100%',
    minHeight: 56,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 3,
  },
  fill: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0,
    textAlign: 'center',
  },
  primaryText: {
    color: '#171032',
  },
  secondaryText: {
    color: '#F7EDFF',
  },
  dangerText: {
    color: '#FFD8DE',
  },
  secondary: {
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.34)',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  ghost: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.11)',
    backgroundColor: 'rgba(255, 255, 255, 0.045)',
  },
  danger: {
    borderWidth: 1,
    borderColor: 'rgba(255, 122, 148, 0.28)',
    backgroundColor: 'rgba(128, 39, 72, 0.25)',
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.62,
  },
});
