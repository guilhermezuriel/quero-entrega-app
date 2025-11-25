import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../src/styles/globals.css'
import '../src/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>QueroEntrega</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
