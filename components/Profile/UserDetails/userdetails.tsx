interface User {
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
  

interface UserDetailsProps {
    user: User
}

export default function UserDetails({ user }: UserDetailsProps) {
    return(
        <>
            <div className="mb-4">
                <img src={user.images[1].url} alt="Profile" className="w-16 h-16 rounded-full" />
            </div>
            <div className="text-lg font-bold text-slate-50">{user.display_name}</div>
            <div className="text-slate-50">{user.email}</div>
            <div className="text-slate-50">Followers: {user.followers.total}</div>
            <div className="text-slate-50">Country: {user.country}</div>
            <div className="text-slate-50">Product Type: {user.product}</div>
        </>
    )
}