'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {useRouter} from 'next/router';
import Landing from '@/components/Landing/landing'
import Image from 'next/image'

export default function Home() {

  const [url, setUrl] = useState<string>("");
  const router = useRouter()

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setUrl(`${pathname}?${searchParams}`);
  }, [pathname, searchParams]);

  return (
    <Landing url={router.asPath} />
  )
}
