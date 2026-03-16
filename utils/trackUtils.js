export function getTotalDurationSeconds(tracks) {
  return tracks.reduce((sum, track) => {
    const [min, sec] = track.duration.split(':').map(Number);
    return sum + min * 60 + sec;
  }, 0);
}
