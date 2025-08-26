import { customAlphabet } from 'nanoid';

type CharSetOption = 'UPPERCASE' | 'LOWERCASE' | 'NUMBER';

interface IdGeneratorOptions {
  charSet: CharSetOption[];
  size: number;
  prefix?: string;
}

const CHAR_SETS: Record<CharSetOption, string> = {
  UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
  NUMBER: '0123456789',
};

export function useId(options: IdGeneratorOptions): string {
  const { charSet, size, prefix = '' } = options;

  if (!charSet || charSet.length === 0) {
    throw new Error('At least one character set must be specified.');
  }

  const alphabet = charSet.map((type) => CHAR_SETS[type]).join('');

  const nanoid = customAlphabet(alphabet, size);
  return prefix + nanoid();
}
