import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import pug from 'gulp-pug';

export const pugToHtml = () => {
  return app.gulp.src(app.path.src.pug)
    .pipe(app.plugins.plumber( // Обработка ошибок
      app.plugins.notify.onError({ // Уведомление ошибок
        title: 'PUG',
        message: 'Error <%= error.message %>'
      })
    ))
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(app.gulp.dest(app.path.build.html)) // Выгружаем в папку результата
    .pipe(app.gulp.src(app.path.build.html))
    .pipe(app.plugins.replace(/@img\//g, 'img/')) // Заменяем синтаксис алиасов для изображений для корректного их отображения в папке результата
    .pipe(
      app.plugins.if(
        app.isBuild,
        webpHtmlNosvg() // Преобразование в WEBP происходит только в режиме продакшн
      )
    )
    .pipe(
      app.plugins.if( // Добавление версий происходит только в режиме продакшн
        app.isBuild,
        versionNumber({
          'value': '%DT%', // добавляется текущая дата и время
          'append': {
            'key': '_v',
            'cover': 0,
            'to': [
              'css',
              'js',
            ]
          },
          'output': {
            'file': 'gulp/version.json'
          }
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html)) // Выгружаем в папку результата
    .pipe(app.plugins.browsersync.stream());
}

// src() - метод gulp, который получает доступ к папкам и файлам по указанному пути (путь - аргумент метода)
// dest() - destination (пункт назначения), указываем путь куда переносить файлы

// fileinclude - Этот плагин позволяет вести модульную (разбивать элементы на куски кода и инклудить в основной) разработку в html
// webpHtmlNosvg - Подключение изображений в формате webp, если такое возможно. Реализуется через тэг picture.
// versionNumber - Позволяет избегать ситуаций с кэшированием (например у заказчика ничего не изменилось). Добавляет к файлам определенный ключ, который не позволит их кэшировать в браузере

// У данной задачи единственная функция получение файлов с исходниками и перенос в папку результата

