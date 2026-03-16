import { test as base, expect } from '@playwright/test';
import { PlaylistPage } from '../pages/playlistPage';

type Fixtures = {
  playlistPage: PlaylistPage;
};

export const test = base.extend<Fixtures>({
  playlistPage: async ({ page }, use) => {
    // await page.goto('https://vite-react-alpha-lemon.vercel.app/');
    const playlist = new PlaylistPage(page);
    await playlist.navigate();
    await use(playlist);
  },
});

export { expect };
