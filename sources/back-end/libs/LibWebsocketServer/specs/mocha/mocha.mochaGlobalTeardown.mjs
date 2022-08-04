import {
  rm,
} from 'node:fs/promises';

const deleteTLS = async (tmpPath = null) => await rm(tmpPath, {
  recursive: true,
});

export async function mochaGlobalTeardown() {
  return await deleteTLS(process.env.WS_TLS_ROOT_PATH);
}
