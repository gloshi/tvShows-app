import { NextApiRequest,NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prismadb from "@/libs/prismadb";

const serverAuth = async (req: NextApiRequest,res: NextApiResponse) => {
    
    const session = await getServerSession(req, res, authOptions);


    if(!session?.user?.email){
        throw new Error('не авторизован')
    }
    console.log(session)
    const currentUser = await prismadb.user.findUnique({
        where:{
            email: session.user.email
        }
    })

    if(!currentUser){
        throw new Error('не авторизован')
    }
    return {currentUser}
}

export default serverAuth