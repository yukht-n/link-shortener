import { describe, expect, it } from 'vitest';
import { generateSlug } from './helpers';

describe('generateSlug() test', () => {
  it('should return a string of exactly 6 characters', () => {
    const slug = generateSlug();
    expect(slug).toHaveLength(6);
  });
  it('should consist only of alphanumeric characters', () => {
    const slug = generateSlug();
    expect(slug).toMatch(/^[a-zA-Z0-9]+$/);
  });

  it('should produce different values on subsequent calls', () => {
    const first = generateSlug();
    const second = generateSlug();
    expect(first).not.toBe(second);
  });
});
