import { Inter } from "next/font/google";
import Head from "next/head";
import HomePage from "../pages/Components/pages/Home/Home";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Motion Diary</title>
        <meta property="og:title" content="Motion Diary" />
        <meta
          property="og:image"
          content="https://i.ibb.co/RY7ng1V/338277762-575066831071383-4120655159452517510-n.png"
        />
        <meta
          property="og:description"
          content="A full-featured blog application that allows users to view a list of blog posts, read individual blog posts, create new blog posts, and interact with the content using Next.js and React."
        />
        <meta property="og:url" content="https://motion-diary.vercel.app/" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomePage />
      </main>
    </>
  );
}
