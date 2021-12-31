/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 15:36:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-30 17:58:53
 */
const permanent = -2;

class LocalStorage {
  constructor() {
    this.init();
  }
  /* init */
  init() {
    const count = localStorage.length;
    for (let i = 0; i < count; i++) {
      (function (index) {
        _watcher(localStorage.key(index));
      })(i);
    }
  }

  /* set */
  set(key: any, value: any, expiry: number) {
    if (expiry && expiry > 0) {
      expiry = new Date().getTime() + expiry;
    } else {
      expiry = permanent;
    }
    localStorage.setItem(key, JSON.stringify({ value, expiry }));
  }

  /* get */
  get(key: any, def: any = null) {
    const cache = localStorage.getItem(key);
    if (cache) {
      const _catch = JSON.parse(cache);
      const expiry = _catch?.expiry;
      if (expiry === permanent) {
        return _catch.value;
      }
      if (expiry > 0) {
        const expiryDate = new Date(expiry);
        if (new Date().getTime() >= expiryDate.getTime()) {
          this.remove(key);
          return null;
        }
      }
      return _catch.value;
    }
    return def;
  }

  /* remove / delete */
  remove(key: any) {
    localStorage.removeItem(key);
  }
}

function _watcher(key: any) {
  const lTemp = localStorage.getItem(key);
  if (lTemp) {
    try {
      const temp = JSON.parse(lTemp);
      if (typeof temp === "object" && temp) {
        const expiry: number = temp.expiry;
        if (expiry !== permanent && expiry > 0) {
          const interval = Number(new Date(expiry)) - new Date().getTime();
          if (interval <= 0) {
            localStorage.removeItem(key);
            return;
          }
          setTimeout(function () {
            localStorage.removeItem(key);
          }, interval);
        }
      }
    } catch (ign) {
      throw new Error(ign);
    }
  }
}

export default LocalStorage;
