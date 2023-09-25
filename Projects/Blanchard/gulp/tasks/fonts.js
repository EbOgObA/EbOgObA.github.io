import fs from 'fs'; // Плагин который работает с файловой системой
import fonter from 'gulp-fonter'; // Позволяет преобразовать шрифты из OTF в TTF и WOFF
import ttf2woff2 from 'gulp-ttf2woff2'; // Позволяет преобразовать шрифты из TTF в WOFF2

// 1 ЭТАП - преобразуем шрифты OTF в TTF, если таковые имеютсяя
export const otfToTtf = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {}) // Ищем файлы шрифтов .otf
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(fonter({ // Конвертируем в .ttf
      formats: ['ttf']
    }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`)); // Выгружаем в исходную папку
}

// 2 ЭТАП - преобразуем шрифты TTF в WOFF, если таковые имеютсяя
export const ttfToWoff = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {}) // Ищем файлы шрифтов .ttf
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(fonter({ // Конвертируем в .woff
      formats: ['woff']
    }))
    .pipe(app.gulp.dest(`${app.path.build.fonts}`)) // Выгружаем в папку с результатом
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`)) // Ищем файлы шрифтов .ttf
    .pipe(ttf2woff2()) // Конвертируем в .woff2
    .pipe(app.gulp.dest(`${app.path.build.fonts}`)); // Выгружаем в папку с результатом
}

// 3 ЭТАП - Если уже имеются шрифты формата WOFF и WOFF2 переносим их в папку результата
export const woffStyle = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.woff`, {}) // Ищем файлы шрифтов .woff
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(app.gulp.dest(`${app.path.build.fonts}`)) // Выгружаем в папку с результатом
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.woff2`)) // Ищем файлы шрифтов .woff2
    .pipe(app.gulp.dest(`${app.path.build.fonts}`)) // Выгружаем в папку с результатом
}

// 4 ЭТАП - Подключение файлов шрифтов в файл стилей
export const fontsStyle = () => {
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`; // Файл стилей подключения шрифтов
  // Проверяем существуют ли файлы шрифтов
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      console.log(fontsFile);
      // Проверяем существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        // Если файла нет, создаем его
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          // Записываем подключения шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            let fontStyle = fontFileName.split('-')[2] ? fontFileName.split('-')[2] : fontFileName;
            // Проверяем начертание шрифта
            if (fontWeight.toLowerCase() === 'thin') {
              fontName += '-Thin';
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontName += '-ExtraLight';
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontName += '-Light';
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontName += '-Medium';
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontName += '-SemiBold';
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontName += '-Bold';
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold') {
              fontName += '-ExtraBold';
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'heavy') {
              fontName += '-Heavy';
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontName += '-Black';
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            // Проверяем стиль шрифта
            if (fontStyle.toLowerCase() === 'italic') {
              fontName += '-Italic';
              fontStyle = 'italic';
            } else {
              fontStyle = 'normal';
            }
            fs.appendFile(fontsFile,
              `@font-face {\n\tfont-family: "${fontName}";\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        // Если файл есть, выводим сообщение
        console.log('Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!');
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`)
  function cb() { }
}