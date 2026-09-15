// Event photos for the landing-page carousel. Files live in public/photos,
// resized to 1600px and saved as WebP. Add a photo: drop the file in, add a row.
export type Photo = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const photos: Photo[] = [
  { src: "/photos/bullet-pitch-officers.webp", alt: "Three officers at the Meloy Kickstart table at the pitch competition outside Zachry", caption: "Pitch competition", width: 1600, height: 1066 },
  { src: "/photos/speaker-night.webp", alt: "A full room of students listening to a speaker", caption: "Speaker night", width: 1600, height: 1200 },
  { src: "/photos/topgolf-social.webp", alt: "A large group of members outside Topgolf at night", caption: "Topgolf social", width: 1600, height: 1200 },
  { src: "/photos/members-meeting.webp", alt: "Four members seated by the windows at a meeting", caption: "General meeting", width: 1200, height: 1600 },
  { src: "/photos/guest-speaker.webp", alt: "A guest speaker writing on a whiteboard", caption: "Guest speaker", width: 1199, height: 1600 },
  { src: "/photos/bullet-pitch-table.webp", alt: "Students gathered around the pitch competition tent and banner", caption: "Pitch competition", width: 1600, height: 1066 },
  { src: "/photos/members-meeting-2.webp", alt: "Members eating and talking at a meeting", caption: "General meeting", width: 1200, height: 1600 },
  { src: "/photos/general-meeting.webp", alt: "Wide view of a general meeting in the Zachry classroom", caption: "General meeting", width: 1600, height: 1200 },
  { src: "/photos/topgolf-officers.webp", alt: "Officers posing in a Topgolf bay", caption: "Topgolf social", width: 1600, height: 1200 },
  { src: "/photos/members-meeting-3.webp", alt: "A member smiling at a table during a meeting", caption: "General meeting", width: 1200, height: 1600 },
  { src: "/photos/general-meeting-2.webp", alt: "Students arriving for a general meeting", caption: "General meeting", width: 1600, height: 1200 },
];
