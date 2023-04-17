import MovieList from "@/components/MovieList"
import VideoBoard from "@/components/VideoBoard"
import NavBar from "@/components/navbar"
import useCurrentUser from "@/hooks/useCurrentUser"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import useMovieList from '@/hooks/useMovieList';

import useFavorites from '@/hooks/useFavorites';
import Description from "@/components/Description"
import useDesc from "@/hooks/UseDesc"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if(!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}


export default function Home() {

  const {data: user} = useCurrentUser()

  const { data: movies = [] } = useMovieList();
  
  const { data: favorites = [] } = useFavorites();

  const {isOpen,closeModal} = useDesc()

  return (
    <>
      <Description visible={isOpen} onClose={closeModal} />
      <NavBar />
      <VideoBoard />
      <div className="pb-40">
      <MovieList title="В тренде" data={movies} />
      <MovieList title="Избранное" data={favorites} />
      </div>
    </>
  )
}
