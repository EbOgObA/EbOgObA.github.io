import webpack from 'webpack-stream';

export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber( // Обработка ошибок
      app.plugins.notify.onError({ // Уведмоление ошибок
        title: 'JS',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(webpack({
      mode: app.isBuild ? 'production' : 'development', // Смена режима
      output: {
        filename: 'app.min.js' // Файл результата
      }
    }))
    .pipe(app.gulp.dest(app.path.build.js)) // Выгрузка в папку результата проекта
    .pipe(app.plugins.browsersync.stream()) // Синхронизация с браузером
}

// sourcemaps - карта исходников для понимания в каком из файлов ошибка