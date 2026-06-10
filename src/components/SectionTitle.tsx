import { StyleSheet, Text, View } from 'react-native';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

export function SectionTitle({ title, subtitle, eyebrow }: SectionTitleProps) {
  return (
    <View style={styles.container}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  eyebrow: {
    color: '#D7B7FF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFF8EA',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 38,
  },
  subtitle: {
    color: 'rgba(245, 238, 255, 0.76)',
    fontSize: 16,
    lineHeight: 23,
  },
});
