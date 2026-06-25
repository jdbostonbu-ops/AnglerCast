import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

export type FaqDocument = {
  source: string;
  title: string;
  text: string;
};

const faqDirectory = path.join(process.cwd(), 'src', 'lib', 'faq');

const getTitleFromMarkdown = (text: string, source: string): string => {
  const heading = text
    .split(/\r?\n/)
    .find((line) => line.startsWith('# '));

  return heading?.replace(/^#\s+/, '').trim() ?? source.replace(/\.md$/, '');
};

export const loadFaqDocuments = (): FaqDocument[] => {
  let filenames: string[];

  try {
    filenames = readdirSync(faqDirectory);
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      return [];
    }

    throw error;
  }

  return filenames
    .filter((filename) => filename.endsWith('.md'))
    .sort()
    .map((filename) => {
      const text = readFileSync(path.join(faqDirectory, filename), 'utf8');

      return {
        source: filename,
        title: getTitleFromMarkdown(text, filename),
        text,
      };
    });
};
