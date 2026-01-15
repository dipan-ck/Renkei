import { z } from 'zod';
import {createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { workflowsRouter } from '@/features/workflows/server/routers';




export const appRouter = createTRPCRouter({


  workflows : workflowsRouter,

  getUsers: protectedProcedure.query(({ctx}) => {
    
    return prisma.user.findMany({
      where : {
        id : ctx.auth.user.id
      }
    })

    }),
});




export type AppRouter = typeof appRouter;