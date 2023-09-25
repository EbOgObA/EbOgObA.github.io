// Основной модуль, импорт самого gulp из пакета
import gulp from 'gulp';
// Импорт путей
import { path } from './gulp/config/path.js';
// Импортт общих плагинов

// Помимо основного сценария gulpfile.js будет множество файлов,
// в которых будут содержаться конкретные задачи (они хранятся в gulp/tasks)
// в них используются одни и те же сущности

// Здесь хранятся общие сущности
// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'), // Флаг - режим продакшен
  isDev: !process.argv.includes('--build'), // Флаг - режим разработчика
  path: path,
  gulp: gulp,
  plugins: plugins,
}

// Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { pugToHtml } from './gulp/tasks/pug.js';
import { html } from './gulp/tasks/html.js';
import { plugins } from './gulp/config/plugins.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, woffStyle, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
import { php } from './gulp/tasks/php.js';
import { composer } from './gulp/tasks/composer.js';

// Наблюдатель за изменениями в файлах
function watcher() {
  // Указываются путь к файлам, действия которые нужно выполнить при изменении файлов
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.pug, pugToHtml);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.php, php);

  //! Для того что бы при изменении того или иного файла они тут же попадали на сервер
  // gulp.watch(path.watch.files, gulp.series(html, copy));
  // gulp.watch(path.watch.html, gulp.series(html, ftp));
  // gulp.watch(path.watch.scss, gulp.series(scss, ftp));
  // gulp.watch(path.watch.js, gulp.series(js, ftp));
  // gulp.watch(path.watch.images, gulp.series(images, ftp));
}

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, woffStyle, fontsStyle);

// Основные задачи
// Сначала обрабатываем шрифты и затем параллельно выполняем основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, pugToHtml, scss, js, images, php, composer));

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)); // Сценарии выполнения задач в режиме разработчика
const build = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)); // Сценарии выполнения задач в режиме продакшен
const deployZIP = gulp.series(reset, mainTasks, zip); // Сценарий создания ZIP архива
const deployFTP = gulp.series(reset, mainTasks, ftp); // Сценирий выгрузки собранного проекта на FTP сервер

// Экспорт сценариев для того чтобы их было видно извне
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

export { svgSprive }

// Выполнение сценария по умолчанию
gulp.task('default', dev);

// Метод series() - выполняет задачи последовательно, НЕодновременно
// Метод parallel() - выполняет задачи параллельно, т.е. одновременно

// process.argv - хранит в себе переданный флаг