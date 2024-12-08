export interface PlaybackState {
  timestamp: number;
  context: {
    uri: string;
    metadata: Record<string, any>;
  };
  position: number;
  duration: number;
  paused: boolean;
  playback_quality: string;
  playback_features: {
    hifi_status: string;
    playback_speed: {
      current: number;
      selected: number;
      restricted: boolean;
    };
    signal_ids: any[];
    modes: Record<string, any>;
  };
  shuffle: boolean;
  shuffle_mode: number;
  repeat_mode: number;
  track_window: {
    current_track: {
      id: string;
      uri: string;
      type: string;
      uid: string;
      linked_from: {
        uri: string | null;
        id: string | null;
      };
      media_type: string;
      track_type: string;
      content_type: string;
      name: string;
      duration_ms: number;
      artists: {
        name: string;
        uri: string;
      }[];
      album: {
        uri: string;
        name: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
      };
      is_playable: boolean;
      metadata: Record<string, any>;
    };
    next_tracks: {
      id: string;
      uri: string;
      type: string;
      uid: string;
      linked_from: {
        uri: string | null;
        id: string | null;
      };
      media_type: string;
      track_type: string;
      content_type: string;
      name: string;
      duration_ms: number;
      artists: {
        name: string;
        uri: string;
      }[];
      album: {
        uri: string;
        name: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
      };
      is_playable: boolean;
      metadata: Record<string, any>;
    }[];
    previous_tracks: {
      id: string;
      uri: string;
      type: string;
      uid: string;
      linked_from: {
        uri: string | null;
        id: string | null;
      };
      media_type: string;
      track_type: string;
      content_type: string;
      name: string;
      duration_ms: number;
      artists: {
        name: string;
        uri: string;
      }[];
      album: {
        uri: string;
        name: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
      };
      is_playable: boolean;
      metadata: Record<string, any>;
    }[];
  };
  restrictions: {
    disallow_setting_playback_speed_reasons: string[];
    disallow_removing_from_next_tracks_reasons: string[];
    disallow_removing_from_context_tracks_reasons: string[];
    disallow_updating_context_reasons: string[];
    disallow_play_as_next_in_queue_reasons: string[];
    disallow_pausing_reasons: string[];
  };
  disallows: {
    setting_playback_speed: boolean;
    removing_from_next_tracks: boolean;
    removing_from_context_tracks: boolean;
    updating_context: boolean;
    play_as_next_in_queue: boolean;
    pausing: boolean;
  };
  loading: boolean;
  playback_speed: number;
  playback_id: string;
}

export interface RawTrack {
  id: string;
  uri: string;
  type: string;
  uid: string;
  linked_from: {
    uri: string | null;
    id: string | null;
  };
  media_type: string;
  track_type: string;
  content_type: string;
  name: string;
  duration_ms: number;
  artists: {
    name: string;
    uri: string;
  }[];
  album: {
    uri: string;
    name: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
  };
  is_playable: boolean;
  metadata: Record<string, any>;
}
