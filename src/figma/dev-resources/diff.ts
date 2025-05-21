import {
  type DevResource,
  type PostDevResourcesRequestBody,
  type PutDevResourcesRequestBody,
} from '@figma/rest-api-spec';
import yoctoSpinner from 'yocto-spinner';
import { figmaFileId, resources } from './constants.js';

/**
 * Performs a diff between the resources returned from Figma's API
 * against our local resources. The local resources are always
 * considered our source of truth and will overwrite the existing
 * resources in Figma. Returns an object with resources grouped by
 * which items to create, update, and delete.
 */
export default (existingResources: DevResource[]) => {
  const spinner = yoctoSpinner({
    text: 'Diffing…\n',
  }).start();

  const toCreate: PostDevResourcesRequestBody['dev_resources'] = [];
  const toDelete: DevResource[] = [];
  const toUpdate: PutDevResourcesRequestBody['dev_resources'] = [];

  const localResources = [];

  // Put our hand-rolled list into the format Figma's APIs expect.
  for (const resource of resources) {
    for (const nodeId of resource.nodeIds) {
      localResources.push(
        {
          name: 'GitHub',
          url: resource.urls.github,
          file_key: figmaFileId,
          // Node IDs in the URL are separated with a `-`, but with
          // a `:` via the API.
          node_id: nodeId.replaceAll('-', ':'),
        },
        {
          name: 'Storybook',
          url: resource.urls.storybook,
          file_key: figmaFileId,
          // Node IDs in the URL are separated with a `-`, but with
          // a `:` via the API.
          node_id: nodeId.replaceAll('-', ':'),
        },
      );
    }
  }

  // A composite key of `node_id:name` is used because each node can
  // have multiple resources associated with it (GitHub, Storybook).
  // A node will never have more than one GitHub or Storybook link
  // though, so this makes the combination unique. Having a unique
  // key allows us to use Maps rather than nested loops to determine
  // which resources to create, delete, or update.
  const existingMap = new Map(
    existingResources.map((resource) => [
      `${resource.node_id}:${resource.name}`,
      resource,
    ]),
  );

  const localResourcesMap = new Map(
    localResources.map((resource) => [
      `${resource.node_id}:${resource.name}`,
      resource,
    ]),
  );

  for (const [key, resource] of localResourcesMap.entries()) {
    if (!existingMap.has(key)) {
      toCreate.push(resource);
    } else if (
      existingMap.get(key)?.id &&
      existingMap.get(key)?.url !== resource.url
    ) {
      toUpdate.push({
        ...resource,
        // We know this will be valid with the check above.
        //
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion
        id: existingMap.get(key)?.id!,
      });
    }
  }

  for (const [key, resource] of existingMap.entries()) {
    if (!localResourcesMap.has(key)) {
      toDelete.push(resource);
    }
  }

  spinner.success(
    `There are ${toCreate.length} items to create, ${toDelete.length} to delete, and ${toUpdate.length} to update.`,
  );

  return {
    toCreate,
    toDelete,
    toUpdate,
  };
};
