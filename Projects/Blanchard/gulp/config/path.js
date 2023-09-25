import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve()); // Получаем имя проекта

const buildFolder = `./dist`; // Можно использовать название текущего проекта rootFolder, эта папка создается автоматически в процессе работы Gulp
const srcFolder =   `./src`;

export const path = { // Здесь хранится вся информацция о пути к тому или иному файлу или папке
  build: { // Объект путей с результатом
    fonts:    `${buildFolder}/fonts/`,
    images:   `${buildFolder}/img/`,
    js:       `${buildFolder}/js/`,
    css:      `${buildFolder}/css/`,
    html:     `${buildFolder}/`,
    files:    `${buildFolder}/files/`,
    php:      `${buildFolder}/php/`,
    composer: `${buildFolder}`,
  },
  src: { // Объект путей с исходными файлами, обрабатывается и переносится в папку с результатом
    svgicons: `${srcFolder}/svgicons/*.svg`, // Путь к SVG спрайтам
    svg:      `${srcFolder}/img/**/*.svg`, // Путь к исходным изображаениям svg
    images:   `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`, // Путь к исходным изображаениям кроме svg
    js:       `${srcFolder}/js/app.js`, // Путь к единственному файлу JS, в котором хранится весь исходный код
    scss:     `${srcFolder}/scss/style.scss`, // Путь к файлам scss
    pug:      `${srcFolder}/*.pug`, // Путь к файлам pug, которые хотим компилировать в папку с результатом
    html:     `${srcFolder}/*.html`, // Путь к файлам html, которые хотим копировать
    files:    `${srcFolder}/files/**/*.*`, // Путь к файлам, которые хотим копировать
    php:      `${srcFolder}/php/**/*.*`, // Путь к файлам php, которые хотим копировать
    composer: `${srcFolder}/composer.{json,lock}`,
  },
  watch: { // Объект с путями файлов, за которыми будет вестись наблюдение, т.е. при любых изменениях файлов будут выполняться определенные действия
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    js:     `${srcFolder}/js/**/*.js`,
    scss:   `${srcFolder}/scss/**/*.scss`, // Наблюдение ведется за всеми исходными файлами scss
    pug:    `${srcFolder}/**/*.pug`, // Наблюдение ведется за всеми исходными файлами pug
    html:   `${srcFolder}/**/*.html`, // Наблюдение ведется за всеми исходными файлами html
    files:  `${srcFolder}/files/**/*.*`, // Наблюдение ведется за исходниками папки files
    php:    `${srcFolder}/php/*.php`, // Наблюдение ведется за исходниками папки php
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  // composer: `${rootFolder}/composer.{json,lock}`,
  ftp: ``, // Указывается папка на удаленном ftp сервере
}

// Примечание:
// ** - любые файлы и папки внутри какого либо пути
// *.* - любые файлы с любым расширением внутри какого либо пути

// При использовании pug следует в path.src.html и path.watch.html заменить расширения .html на .pug

// FTP - подключаемя к удаленному серверу, заходим в указанную папку path.ftp, создается папка проекта и туда заливаются файлы результата