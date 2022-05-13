# SassThemeColors

---

## Simple script to change website theme color

- Run `npm i` to install dependencies
- Run application with `npm run app`
- Open the application `(default address: http://localhost/)`, look title and description, both have a color black.
- To change colors run `npm run themeColor {arg1} {arg2}`
  - arg1: Change the color of title
  - arg2: Change the color of description
  - The color can be hex, rgb, rgba...
  - Example: `npm run themeColor  '#000000' '#494949'`

- This is a simple script you can change based on your need.

---

### Dependencies and uses

- [Fs](https://github.com/nodejs/node/blob/v16.9.0/lib/fs.js)
  - Used to read and write in files
- [Child Process](https://github.com/nodejs/node/blob/v16.9.0/lib/child_process.js)
  - Used to run machine command to compile sass

---

### How to change

- Access the `CompileTemplateColor.js` in `public/js` dir
  - Change value of `fileVars` to your sass file with your variables
  - Change value of `fileName` to your theme file (This file need include the variables)

---

### Notes

 - The `CompileTemplateColor` script generate a json file with your colors
   - Using the previous example the result will be:
```json
{"0":"#000000","1":"#494949"}
```