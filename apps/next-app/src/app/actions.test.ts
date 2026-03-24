import { serverFindShortCode } from '@project/database/db';
import { describe, expect, it, vi } from 'vitest';
import { createShortLink } from './actions';

vi.mock('@project/database/db', () => ({
  serverFindShortCode: vi.fn(),
  serverSaveLink: vi.fn(),
}));

describe('createShortLink Server Action', () => {
  it('should return error for URL without a dot', async () => {
    const formData = new FormData();
    formData.append('url', 'http://nodotdomain');
    formData.append('no-name', '');

    const result = await createShortLink({ success: false }, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.url).toContain('Invalid URL');
  });

  it('Anti-spam : should return error for URL with filled no-name', async () => {
    const formData = new FormData();
    formData.append('url', 'https://google.com');
    formData.append('no-name', 'John');

    const result = await createShortLink({ success: false }, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.antiSpam).toContain('Spam detected');
  });

  it('should return existing shortCode if URL is already shortened', async () => {
    const fakeEntry = {
      id: '1',
      shortCode: 'abcde',
      originalLink: 'https://google.com',
      visits: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vi.mocked(serverFindShortCode).mockResolvedValue(fakeEntry);

    const formData = new FormData();
    formData.append('url', 'https://google.com');
    formData.append('no-name', '');

    const result = await createShortLink({ success: false }, formData);

    expect(result.success).toBe(true);
    expect(result.shortCode).toBe('abcde');
  });
});
