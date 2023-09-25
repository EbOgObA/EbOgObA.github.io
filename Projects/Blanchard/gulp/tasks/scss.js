import dartSass from 'sass'; // Препроцессор SASS, компилятор
import gulpSass from 'gulp-sass'; // Плагин для запуска препроцесора
import rename from 'gulp-rename'; // Изменение имени файла scss

import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов

const sass = gulpSass(dartSass); // Делаем вызов из плагина с передачей компилятора

export const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber( // Обработка ошибок
      app.plugins.notify.onError({  // Уведомление ошибок
        title: 'SCSS',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(sass({ // Производитим компиляцию файла SASS
      outputStyle: 'expanded', // Изначальный стиль готового файла (м.б. сжать и т.д.)
    }))
    .pipe(app.plugins.replace(/@img\//g, '../img/')) // Заменяем синтаксис алиасов для изображений для корректного их отображения в папке результата
    .pipe(
      app.plugins.if( // Группировка медиа запросов только в режиме продакшн
        app.isBuild,
        groupCssMediaQueries()
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild, // Преобразование изображений в формат WEBP только в режиме разработчика
        webpcss(
          {
            webpClass: '.webp', // Если браузер поддерживает webp формат, то к изображению добавится этот класс
            noWebpClass: '.no-webp' // Если нет, то этот
          }
        )
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild, // Автопрефиксер только врежиме продакшен
        autoprefixer({
          grid: true, // Поддержка грид, чтобы грид свойства обрабатывались автопрефиксером
          overrideBrowserslist: ['last 3 versions'], // Количество версий у браузера, последние 3
          cascade: true
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.css)) // НЕ сжатый дубль файла стилей
    .pipe(
      app.plugins.if( // Производим сжатие файла только в режиме продакшен
        app.isBuild,
        cleanCss()
      )
    )
    .pipe(rename({ // Изменияем исходное название scss файла
      extname: '.min.css'
    }))
    .pipe(app.gulp.dest(app.path.build.css)) // Выгружаем преобразованный файл в результат
    .pipe(app.plugins.browsersync.stream());
}

// sourcemaps - карта исходников для понимания в каком из файлов ошибка