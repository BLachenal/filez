import db from "#db/client";

import { faker } from "@faker-js/faker";
import { createFolder } from "./queries/folders.js";
import { createFile } from "./queries/files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  
  for (let i = 0; i < 3; i++){
    const folder = await createFolder({
      name: faker.database.engine()
    });
      for(let j=0; j<5; j++){
        await createFile({
        name: faker.system.commonFileName(),
        size: faker.number.int({max: 1200}),
        folderId:folder.id
      });
    } 
  }
}
