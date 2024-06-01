/**
 * 将对象扁平化，即将多层嵌套的属性转换为一层。
 * @param {Record<string, any>} obj 要扁平化的对象
 * @param {string} prefix 前缀，用于生成扁平化后的属性名
 * @returns {Object} 扁平化后的对象
 */
export const flattenObject = (
  obj: Record<string, any>,
  prefix: string = '',
): Record<string, any> => {
  const result = {};

  for (const key in obj) {
    if (obj[key]) {
      const value = Reflect.get(obj, key);

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // 如果value是一个对象但不是数组，递归处理
        Object.assign(result, flattenObject(value, `${prefix + key}.`));
      } else {
        // 如果value不是对象，直接添加键值对
        Reflect.set(result, prefix + key, value);
      }
    }
  }

  return result;
};

/**
 * 防抖函数
 * @param {Function} fn 要防抖的函数
 * @param {number} ms 延迟执行的时间
 * @returns {Function} 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms: number = 500,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, ms);
  };
}
