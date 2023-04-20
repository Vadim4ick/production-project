import fs from 'node:fs/promises';
import path from 'node:path';

export async function getPathMocks() {
  const src = path.resolve(process.cwd(), 'src');

  const dirents = await fs.readdir(src, { withFileTypes: true });

  const dirNames = dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const mocks = dirNames.reduce<Record<string, string>>((acc, dirName) => {
    const key = `^@/${dirName}/(.*)$`;
    const value = `<rootDir>/src/${dirName}/$1`;
    acc[key] = value;

    return acc;
  }, {});

  return mocks;
}
