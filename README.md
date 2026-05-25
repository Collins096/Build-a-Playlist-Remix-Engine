````markdown
# 🎧 Playlist Remix Engine

## 📌 Overview

The Playlist Remix Engine is a JavaScript program that takes multiple user playlists and transforms them into a single optimized broadcast schedule.

It processes tracks through a pipeline that:
- Flattens nested playlists
- Scores each track
- Removes duplicates
- Enforces artist limits
- Builds a final playback schedule

---

## 🚀 Features

- Combine multiple playlists into one list
- Track original position using `source`
- Score tracks based on votes and BPM
- Remove duplicate tracks by `trackId`
- Limit artist repetition
- Generate final scheduled playlist with slots

---

## 🧠 Track Object Structure

### Original track format:
```js
{
  trackId: "string",
  artist: "string",
  title: "string",
  votes: number,
  bpm: number
}
````

### Enhanced track format (after processing):

```js
{
  ...originalTrack,
  source: [playlistIndex, trackIndex],
  score: number
}
```

---

## ⚙️ Functions

### 1. flattenPlaylists(playlists)

Flattens an array of playlists into a single array and adds a `source` field.

```js
source: [playlistIndex, trackIndex]
```

---

### 2. scoreTracks(tracks)

Adds a score to each track using:

```js
score = votes * 10 - Math.abs(bpm - 120)
```

---

### 3. dedupeTracks(tracks)

Removes duplicate tracks based on `trackId`, keeping the first occurrence.

---

### 4. enforceArtistQuota(tracks, maxPerArtist)

Ensures no artist appears more than the allowed limit, keeping earliest tracks.

---

### 5. buildSchedule(tracks)

Converts tracks into final broadcast format:

```js
{
  slot: 1,
  trackId: "trk101"
}
```

---

### 6. remixPlaylist(playlists, maxPerArtist)

Runs the full pipeline in order:

```js
flattenPlaylists → scoreTracks → dedupeTracks → enforceArtistQuota → buildSchedule
```

---

## 🔁 Pipeline Flow

```text
Playlists
   ↓
flattenPlaylists
   ↓
scoreTracks
   ↓
dedupeTracks
   ↓
enforceArtistQuota
   ↓
buildSchedule
   ↓
Final Schedule
```

---

## 🧪 Example Usage

```js
const result = remixPlaylist(playlists, 2);
console.log(result);
```

---

## 📦 Example Output

```js
[
  { slot: 1, trackId: "trk101" },
  { slot: 2, trackId: "trk102" },
  { slot: 3, trackId: "trk201" }
]
```

---

## 💡 Key Concepts Learned

* Array methods: `map`, `forEach`
* Data transformation pipelines
* Object spreading (`...track`)
* Deduplication using `Set`
* Counting occurrences with objects
* Function composition

---

## 🎯 Goal

Turn messy user-submitted playlists into a clean, fair, and structured broadcast schedule.

```
```
