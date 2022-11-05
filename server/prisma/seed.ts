import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Debs FD',
      email: 'debs@gmail.com',
      avatarUrl: 'https://github.com/debfdias.png',
    }
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Nice Bet',
      code: 'BET123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-20T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-23T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'FR',

      guesses: {
        create: {
          firstTeamPoints: 4,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    },
  })
}

main()
