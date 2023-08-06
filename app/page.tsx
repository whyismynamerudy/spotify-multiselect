import Landing from '@/components/Landing/landing'
import Image from 'next/image'

export default function Home() {

  const url = window.location.search;

  return (
    <Landing url={url} />
  )
}
