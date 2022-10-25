import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { artistsData } from "./data";

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    artistsData.map(async (artist) =>
      prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      })
    )
  );

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync("user-1-password", salt);

  const user = await prisma.user.upsert({
    where: {
      email: "user@test.com",
    },
    update: {},
    create: {
      name: "user-1",
      email: "user@test.com",
      password: hash,
    },
  });

  const songs = await prisma.song.findMany({ take: 3 });

  await Promise.all(
    ["playlist-1", "playlist-2"].map(async (playlistName) => {
      return await prisma.playlist.create({
        data: {
          name: playlistName,
          user: { connect: { id: user.id } },
          songs: { connect: songs.map((song) => ({ id: song.id })) },
        },
      });
    })
  );
}

main()
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
  })
  .finally(async () => await prisma.$disconnect());
