import Link from "next/link";
import Head from "next/head";
import HomeLayout from "../layouts/homelayout";
import Navigation from "../components/navigation";
import hero from '../public/assets/homepage-1.jpg'
import Image from 'next/image'


function Home(props) {
  return (

    <section>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    <Navigation />

    <Image height="100" width="100" src={hero} />
    </section>
  );
}
Home.PageLayout = HomeLayout

export default Home;