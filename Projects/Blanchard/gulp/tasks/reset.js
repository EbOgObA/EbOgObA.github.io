// Импорт плагина del
import { deleteAsync } from 'del';
export const reset = () => {
  return deleteAsync(app.path.clean);
}

// Очистка папки с результатми
// При включеном наблюдателе и при удалении файлов в исходниках в папке
// с результом эти файлы остаются, для этого следует папку результата очистить