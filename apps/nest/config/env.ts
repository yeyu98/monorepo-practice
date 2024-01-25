/*
 * @Author: xiaohu
 * @Date: 2024-01-25 10:31:24
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-01-25 11:15:47
 * @FilePath: \monorepo-practice\apps\nest\config\env.ts
 * @Description:
 */
import * as path from 'path';
function parseEnv() {
  const localEnv = path.resolve('.env');
  return {
    path: localEnv,
  };
}
const envConfig = parseEnv();

export default envConfig;
