/*
 * @Author: dushuai
 * @Date: 2023-11-01 15:46:21
 * @LastEditors: dushuai
 * @LastEditTime: 2023-11-01 16:33:07
 * @description: tailwindcss config
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue, js, ts, jsx, tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class'
}

