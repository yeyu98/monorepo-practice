/*
 * @Author: xiaohu
 * @Date: 2024-01-25 10:31:24
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-01-25 10:45:16
 * @FilePath: \monorepo-practice\apps\nest\config\env.ts
 * @Description:
 */
// import fs from 'fs';
import path from 'path';

function parseEnv() {
  const localEnv = path.resolve('.env');
  return {
    path: localEnv,
  };
}

export default parseEnv;
