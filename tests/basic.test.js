test("Basic test", () => {
  expect(true).toBe(true);
});

test("File existence check", () => {
  const fs = require('fs');
  expect(fs.existsSync('index.html')).toBe(true);
  expect(fs.existsSync('css/styles.css')).toBe(true);
  expect(fs.existsSync('js/main.js')).toBe(true);
});