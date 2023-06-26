/*
 * @Author: xiaohu
 * @Date: 2023-06-26 20:22:55
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-06-26 20:23:02
 * @FilePath: \Explores\apps\react-demo-ts\src\utils\utils.ts
 * @Description: 
 */
export const setLocalStorage = (key: string, value: Object): void => {
  try {
    const currentValue = getLoaclStorage(key);
    const _value = {
      ...currentValue,
      ...value,
    };
    localStorage.setItem(key, JSON.stringify(_value));
  } catch (err) {
    console.log('err --->>>', err);
  }
};

export const getLoaclStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key) ?? '';
    return value ? JSON.parse(value) : '';
  } catch (err) {
    console.log('err --->>>', err);
  }
};

export const removeLocalStorage = (key: string) => {
  try {
    localStorage.remove(key);
  } catch (err) {
    console.log('err --->>>', err);
  }
};
