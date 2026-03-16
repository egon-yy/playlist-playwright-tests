import { Locator, Page } from '@playwright/test';

export class PlaylistPage {
  private page: Page;
  private searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
  }

  async navigate() {
    await this.page.goto('/');
  }

  async searchText(text: string) {
    await this.searchInput.fill(text);
  }

  getGeneralTracksContainer() {
    return this.page.locator('#tracklist > div > div');
  }

  getYourPlaylistTracksContainer() {
    return this.page.locator('#playlist > div > div');
  }

  async getGeneralTracks() {
    return this._getTracksFromContainer(this.getGeneralTracksContainer());
  }

  async getPlaylistTracks() {
    return this._getTracksFromContainer(this.getYourPlaylistTracksContainer());
  }

  async addTracksToPlaylist(numberOfTracks: number) {
    const container = this.getGeneralTracksContainer();
    const count = await container.count();
    const tracksToAdd = Math.min(numberOfTracks, count);

    for (let i = 0; i < tracksToAdd; i++) {
      const trackDiv = container.nth(i);
      const addButton = trackDiv.locator('button');
      await addButton.click();
    }
  }

  async getTotalPlaylistDurationDisplayed() {
    const playlistDuration = this.page.locator('#playlist-duration');
    const text = await playlistDuration.innerText();
    return Number(text);
  }

  private async _getTracksFromContainer(container: Locator) {
    const containersCount = await container.count();
    const tracks = [];

    for (let i = 0; i < containersCount; i++) {
      const trackDiv = container.nth(i);
      const trackInfoTexts = await trackDiv.locator('p').allInnerTexts();

      if (trackInfoTexts.length >= 2) {
        tracks.push({ name: trackInfoTexts[0], duration: trackInfoTexts[1] });
      }
    }

    return tracks;
  }
}
