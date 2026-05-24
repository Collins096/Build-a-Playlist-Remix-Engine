function flattenPlaylists(playlists) {
    // Return empty array if input is not an array
    if (!Array.isArray(playlists)) {
      return [];
    }
  
    let flattened = [];
  
    // Loop through playlists
    playlists.forEach((playlist, playlistIndex) => {
  
      // Loop through tracks
      playlist.forEach((track, trackIndex) => {
  
        flattened.push({
          ...track,
          source: [playlistIndex, trackIndex]
        });
  
      });
  
    });
  
    return flattened;
  }
  
  function scoreTracks(tracks) {
    return tracks.map(track => ({
      ...track,
      score: track.votes * 10 - Math.abs(track.bpm - 120)
    }));
  }
  
  function dedupeTracks(tracks) {
    let seen = new Set();
  
    return tracks.filter(track => {
  
      if (seen.has(track.trackId)) {
        return false;
      }
  
      seen.add(track.trackId);
      return true;
    });
  }
  
  function enforceArtistQuota(tracks, maxPerArtist) {
    let artistCount = {};
  
    return tracks.filter(track => {
  
      if (!artistCount[track.artist]) {
        artistCount[track.artist] = 0;
      }
  
      if (artistCount[track.artist] < maxPerArtist) {
        artistCount[track.artist]++;
        return true;
      }
  
      return false;
    });
  }
  
  function buildSchedule(tracks) {
    return tracks.map((track, index) => ({
      slot: index + 1,
      trackId: track.trackId
    }));
  }
  
  function remixPlaylist(playlists, maxPerArtist) {
  
    const flattened = flattenPlaylists(playlists);
  
    const scored = scoreTracks(flattened);
  
    const deduped = dedupeTracks(scored);
  
    const limited = enforceArtistQuota(deduped, maxPerArtist);
  
    return buildSchedule(limited);
  }
  
  /* Example Test Data */
  
  const playlists = [
    [
      {
        trackId: "t1",
        artist: "Artist A",
        title: "Song 1",
        votes: 8,
        bpm: 118
      },
      {
        trackId: "t2",
        artist: "Artist B",
        title: "Song 2",
        votes: 5,
        bpm: 130
      }
    ],
  
    [
      {
        trackId: "t1",
        artist: "Artist A",
        title: "Song 1",
        votes: 8,
        bpm: 118
      },
      {
        trackId: "t3",
        artist: "Artist A",
        title: "Song 3",
        votes: 9,
        bpm: 121
      }
    ]
  ];
  
  console.log(remixPlaylist(playlists, 2));