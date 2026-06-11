import { StyleSheet, Text, View } from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenScrollView } from '../components/ScreenScrollView';
import { SectionTitle } from '../components/SectionTitle';
import { STRINGS } from '../data/localization';
import type { Language } from '../types';

type PlusPreviewScreenProps = {
  language: Language;
  onTrySample: () => void;
  onBack: () => void;
};

export function PlusPreviewScreen({ language, onTrySample, onBack }: PlusPreviewScreenProps) {
  const copy = STRINGS[language];

  return (
    <GradientBackground>
      <ScreenScrollView contentContainerStyle={styles.content}>
        <SectionTitle
          eyebrow="Moonlit Plus"
          subtitle={copy.plus.subtitle}
          title={copy.plus.title}
        />

        <View style={styles.planStack}>
          <PlanPanel
            benefits={copy.plus.freeBenefits}
            title={copy.plus.freeTitle}
            tone="free"
          />
          <PlanPanel
            benefits={copy.plus.plusBenefits}
            badge={copy.plus.badge}
            title={copy.plus.plusTitle}
            tone="plus"
          />
        </View>

        <View style={styles.notePanel}>
          <Text style={styles.noteText}>{copy.plus.note}</Text>
        </View>

        <PrimaryButton title={copy.plus.sampleButton} onPress={onTrySample} />
        <PrimaryButton title={copy.common.back} onPress={onBack} variant="ghost" />
      </ScreenScrollView>
    </GradientBackground>
  );
}

type PlanPanelProps = {
  title: string;
  benefits: string[];
  badge?: string;
  tone: 'free' | 'plus';
};

function PlanPanel({ title, benefits, badge, tone }: PlanPanelProps) {
  const isPlus = tone === 'plus';

  return (
    <View style={[styles.planPanel, isPlus ? styles.plusPanel : styles.freePanel]}>
      <View style={styles.planHeader}>
        <Text style={styles.planTitle}>{title}</Text>
        {isPlus && badge ? <Text style={styles.badge}>{badge}</Text> : null}
      </View>
      <View style={styles.benefits}>
        {benefits.map((benefit) => (
          <View key={benefit} style={styles.benefitRow}>
            <View style={[styles.dot, isPlus ? styles.plusDot : styles.freeDot]} />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 22,
  },
  planStack: {
    gap: 14,
  },
  planPanel: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    gap: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 3,
  },
  freePanel: {
    borderColor: 'rgba(255, 255, 255, 0.13)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  plusPanel: {
    borderColor: 'rgba(241, 213, 138, 0.34)',
    backgroundColor: 'rgba(241, 213, 138, 0.1)',
  },
  planHeader: {
    minHeight: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  planTitle: {
    color: '#FFF8EA',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0,
  },
  badge: {
    borderRadius: 999,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#25163C',
    backgroundColor: '#F1D58A',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  benefits: {
    gap: 11,
  },
  benefitRow: {
    minHeight: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 8,
  },
  freeDot: {
    backgroundColor: 'rgba(215, 183, 255, 0.9)',
  },
  plusDot: {
    backgroundColor: '#F1D58A',
  },
  benefitText: {
    flex: 1,
    color: 'rgba(245, 238, 255, 0.82)',
    fontSize: 15,
    lineHeight: 22,
  },
  notePanel: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.11)',
    backgroundColor: 'rgba(7, 8, 28, 0.36)',
    padding: 18,
  },
  noteText: {
    color: 'rgba(245, 238, 255, 0.72)',
    fontSize: 14,
    lineHeight: 21,
  },
});
