'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Landing from '@/components/Landing/landing'
import Image from 'next/image'

export default function Home() {

  const params = useSearchParams();
  const access_token = params.get('access_token');
  const token_type = params.get('token_type');

  const queries = `?access_token=${access_token}&token_type=${token_type}`;

  const url = "https://spotify-multiselect.vercel.app/" + (access_token ? queries : "")

  return (
    <Landing url={url} />
  )
}
