import MusicPlayer from "../sections/music_player";
import QueuePreview from "../sections/queue_preview";

export default function MainView() {
  return (
    <div className="flex flex-col items-center">
      <MusicPlayer />
      <QueuePreview />
    </div>
  );
}
