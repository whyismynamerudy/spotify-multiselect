import { User } from "@/utils/types";
  

interface UserDetailsProps {
    user: User
}

export default function UserDetails({ user }: UserDetailsProps) {
    return(
        <>
            <div className="mb-4 m-auto">
                <img src={user.images[1].url} alt="Profile" className="h-40 w-40 rounded-full" />
            </div>
            <div className="text-xl font-bold text-slate-50">{user.display_name}</div>
            <div className="text-slate-50 text-lg">{user.id}</div>
            <div className="text-slate-50">Followers: {user.followers.total}</div>
        </>
    )
}