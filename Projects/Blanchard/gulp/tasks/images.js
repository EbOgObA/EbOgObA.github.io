import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
  return app.gulp.src(app.path.src.images)
    .pipe(app.plugins.plumber( // Обработка ошибок
      app.plugins.notify.onError({ // Уведмоление ошибок
        title: 'IMAGES',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(app.plugins.newer(app.path.build.images)) // Обрабатываем только те картинки, к-ых нет в папке результата проекта
    .pipe(
      app.plugins.if(
        app.isBuild,
        webp() // Преобразуем в формат WEBP только в режиме продакшн
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.gulp.dest(app.path.build.images) // Выгружаем в папку результата проекта все изображения из исходниов
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.gulp.src(app.path.src.images)
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.plugins.newer(app.path.build.images) // Обрабатываем только те картинки, к-ых нет в папке результата проекта
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        imagemin({ // Сжатие изображений только в режиме продакшн
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interplaced: true,
          optimizationLevel: 3 // от 0 до 7 - насколько сильно сжимаем изображение
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.images)) // Выгрузка сжатых изображений в режиме продакшен и обычных в режиме разработчика
    .pipe(app.gulp.src(app.path.src.svg)) // Получаем доступ к SVG изображениям
    .pipe(app.gulp.dest(app.path.build.images)) // Просто копируем SVG изображения в папку результата проекта
    .pipe(app.plugins.browsersync.stream());
}