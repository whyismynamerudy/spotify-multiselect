'use client'

import { useSearchParams } from 'next/navigation'
import Landing from '@/components/Landing/landing'

export default function Home() {

  const params = useSearchParams();
  const access_token = params.get('access_token');
  const token_type = params.get('token_type');
  const expires_in = params.get('expires_in');

  const queries = `?access_token=${access_token}&token_type=${token_type}&expires_in=${expires_in}`;

  const url = "https://spotify-multiselect.vercel.app/" + (access_token ? queries : "")

  return (
    <Landing url={url} />
  )
}
