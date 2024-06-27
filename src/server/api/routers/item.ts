import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const itemRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        expiryDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.item.create({
        data: {
          name: input.name,
          dates: {
            create: [{ date: input.expiryDate }],
          },
        },
      });
    }),

  markChecked: protectedProcedure
    .input(
      z.object({
        itemId: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.item.update({
        where: { id: input.itemId },
        data: {
          dates: {
            deleteMany: {},
          },
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.item.findMany();
  }),

  search: protectedProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.item.findMany({
        where: {
          name: {
            contains: input.query,
          },
        },
      });
    }),

  getExpiringToday: protectedProcedure.query(async ({ ctx }) => {
    const startOfDay = new Date();
    const endOfDay = new Date();

    startOfDay.setUTCHours(0, 0, 0, 0);
    endOfDay.setUTCHours(23, 59, 59, 999);

    return ctx.db.item.findMany({
      where: {
        dates: {
          some: {
            date: {
              lte: endOfDay,
            },
          },
        },
      },
      include: {
        dates: true,
      },
    });
  }),
});
