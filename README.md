# Adding your videos

Drop your reel files into this folder with these exact names to have them appear automatically in the "Work" section:

- `darling.mp4` — the Darling reel
- `vit.mp4` — the VIT reel

## Tips
- Keep each file under ~15MB if possible (compress with HandBrake or CapCut export settings) so the site loads fast — GitHub also has a 25MB file-size limit for drag-and-drop uploads, and 100MB per-file hard limit via git.
- MP4 (H.264) format works everywhere.
- If a video file is missing, the card automatically falls back to the colored brand tile — nothing breaks.
- Want a 4th, 5th, 6th case study? Duplicate a `<article class="work-card">` block in `index.html`, give the video a new filename, and drop the matching file in here.
