import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a 
        href='\api\login'
      >
        <p className="text-white">this is a feature that <span className="text-green-500"> Spotify</span> should have implemented already</p>
        <p className="text-white">Log in to Spotify</p>
      </a>
    </main>
  )
}
