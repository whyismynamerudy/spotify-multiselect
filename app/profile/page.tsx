import Cookies from 'js-cookie';

export default function Profile() {
    // need to include middleware here to check for auth cookie

    const details = Cookies.get('Authorization');

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p className="text-slate-50">
                {details || "nothing to see here"}
            </p>
        </main>
    )
}