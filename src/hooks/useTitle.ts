import { useState, useEffect } from 'react';

/**
 * 设置标题
 * @param {string} initialTitle
 */
export default (initialTitle: string) => {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return setTitle;
};
