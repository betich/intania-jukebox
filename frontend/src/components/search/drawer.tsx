import MusicSearchCard from "./music_search_card.client";

const mockMusic = [
  {
    title: "Something",
    artist: "The Beatles",
    duration: "3:00",
    cover: "https://placehold.co/150x150.png",
  },
  {
    title: "Hey Jude",
    artist: "The Beatles",
    duration: "4:00",
    cover: "https://placehold.co/150x150.png",
  },
  {
    title: "APT.",
    artist: "ROSÉ, Bruno Mars",
    duration: "2:14",
    cover: "https://placehold.co/150x150.png",
  },
  {
    title: "APT.",
    artist: "ROSÉ, Bruno Mars",
    duration: "2:14",
    cover: "https://placehold.co/150x150.png",
  },
];

export default function SearchDrawer({ search }: { search: string }) {
  console.log("s", search);

  return (
    <div className="w-full bg-white flex flex-col gap-4 absolute top-20 border border-gray-100 shadow-lg p-4 rounded-lg">
      <h1 className="text-xl font-lg">ค้นหาเพลง</h1>

      <div className="flex flex-col gap-2">
        {mockMusic.map((m, i) => (
          <MusicSearchCard
            artist={m.artist}
            cover={m.cover}
            duration={m.duration}
            key={`${i}-${m.title}`}
            title={m.title}
          />
        ))}
      </div>
    </div>
  );
}
