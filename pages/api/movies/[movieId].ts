import serverAuth from '@/libs/serverAuth';
import { without } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/libs/prismadb";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method == 'DELETE') {
    console.log("teste")
    console.log(req)
    const { currentUser } = await serverAuth(req,res);

    const { movieId } = req.query;

    if (typeof movieId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!movieId) {
      throw new Error('Missing Id');
    }

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      }
    });

    if (!existingMovie) {
      throw new Error('Invalid ID');
    }

    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      }
    });

    return res.status(200).json(updatedUser);
  }

  return res.status(405).end();

}