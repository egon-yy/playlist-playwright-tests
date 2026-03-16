import { test, expect } from '../fixtures/fixtures.js';
import { getTotalDurationSeconds } from '../utils/trackUtils.js';

const searchCases = ['Love', 'Summer', 'Wind'];

searchCases.forEach((input) => {
  test(`Search "${input}" filters tracks correctly`, async ({ playlistPage }) => {
    await playlistPage.searchText(input);
    const tracks = await playlistPage.getGeneralTracks();

    for (const track of tracks) {
      expect(track.name.toLowerCase()).toContain(input.toLowerCase());
    }
  });
});

test('Add 2 tracks to playlist and check names', async ({ playlistPage }) => {
  const generalTracksBefore = await playlistPage.getGeneralTracks();
  expect(generalTracksBefore.length).toBeGreaterThanOrEqual(2);

  const tracksToAdd = generalTracksBefore.slice(0, 2).map((t) => t.name);

  await playlistPage.addTracksToPlaylist(2);

  const playlistTracks = await playlistPage.getPlaylistTracks();
  const playlistNames = playlistTracks.map((t) => t.name);

  tracksToAdd.forEach((name) => {
    expect(playlistNames).toContain(name);
  });
});

test('Check the duration of 2 added tracks in playlist', async ({ playlistPage }) => {
  const generalTracksBefore = await playlistPage.getGeneralTracks();
  expect(generalTracksBefore.length).toBeGreaterThanOrEqual(2);

  await playlistPage.addTracksToPlaylist(2);

  const playlistTracks = await playlistPage.getPlaylistTracks();
  const tracksDurationCounted = getTotalDurationSeconds(playlistTracks);

  const tracksDurationDisplayed = await playlistPage.getTotalPlaylistDurationDisplayed();

  expect(tracksDurationDisplayed).toBe(tracksDurationCounted);
});
