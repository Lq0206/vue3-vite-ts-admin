/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2022-01-05 11:16:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 09:58:05
 */
/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: Element, cls: string) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}
/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele: Element, cls: string) {
  if (!hasClass(ele, cls)) {
    ele.className += " " + cls;
  }
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele: Element, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, "");
  }
}

export function greet() {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9
    ? "早上好"
    : hour <= 11
    ? "上午好"
    : hour <= 13
    ? "中午好"
    : hour < 20
    ? "下午好"
    : "晚上好";
}

/* create hash */
export function createHash(len: number) {
  if (!len || typeof Number(len) !== "number") {
    return;
  }
  const hashStr = [];
  const strArr = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  for (let i = 0; i < len; i++) {
    hashStr.push(strArr[Math.floor(Math.random() * strArr.length)]);
  }
  return hashStr.join(" ");
}
