import fetch from './fetch.js';
import deleteMany from './delete.js';
import create from './create.js';
import write from './write.js';
import diff from './diff.js';
import update from './update.js';

/**
 * Queries Figma's API for existing dev resources. Writes them to
 * disk for easier troubleshooting. Performs a diff between the
 * existing resources and our local ones to determine which
 * resources to create, delete, or update and then uses Figma's API
 * to perform those actions.
 */
async function run() {
  const existingResources = await fetch();
  await write(existingResources);

  const { toCreate, toDelete, toUpdate } = diff(existingResources);

  await deleteMany(toDelete);
  await create(toCreate);
  await update(toUpdate);
}

await run();
