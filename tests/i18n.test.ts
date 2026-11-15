import { describe, it, expect } from 'vitest';
import en from '../src/i18n/en.json';
import es from '../src/i18n/es.json';

function getDeepKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  let keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys = keys.concat(getDeepKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

describe('i18n translations consistency', () => {
  it('has identical keys in English and Spanish locale files', () => {
    const enKeys = getDeepKeys(en).sort();
    const esKeys = getDeepKeys(es).sort();

    expect(enKeys).toEqual(esKeys);
  });
});
