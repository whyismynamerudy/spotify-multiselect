export interface User {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    type: string;
    uri: string;
    followers: {
      href: string | null;
      total: number;
    };
    country: string;
    product: string;
    explicit_content: {
      filter_enabled: boolean;
      filter_locked: boolean;
    };
    email: string;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
  primary_color: string | null;
}

export interface Track {
  track: {
    album: {
      external_urls: {
        spotify: string;
      };
      images: {
        height: number;
        url: string;
        width: number;
      }[];
    };
    artists: {
      name: string;
    }[];
    external_urls: {
      spotify: string;
    };
    uri: string;
    name: string;
  };
  isSelected: boolean;
}

export interface PlaylistInfo {
  external_urls: {
    spotify: string;
  };
  images: {
    height: number | null;
    url: string;
    width: number | null;
  }[];
  name: string;
}