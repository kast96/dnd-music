import os
import json

# Путь к папке с плейлистами
PUBLIC_DIR = "public"

# Путь к папке с плейлистами
PLAYLISTS_DIR = "playlists"

# Путь к выходному файлу
OUTPUT_FILE = PUBLIC_DIR + "/playlists.json"

# Функция для сканирования папки с плейлистами
def scan_playlists(directory):
	playlists = []

	# Проходим по всем подпапкам в папке playlists
	for playlist_name in os.listdir(PUBLIC_DIR + '/' + directory):
		playlist_path = os.path.join(directory, playlist_name)

		# Проверяем, что это папка
		if os.path.isdir(PUBLIC_DIR + '/' + playlist_path):
			playlist_data = {
				"name": playlist_name,
				"image": None,
				"tracks": []
			}

			# Сканируем файлы в подпапке
			for file_name in os.listdir(PUBLIC_DIR + '/' + playlist_path):
				file_path = os.path.join(playlist_path, file_name)

				# Если это изображение
				if file_name.lower() in ["image.jpeg", "image.jpg", "image.png"]:
					playlist_data["image"] = file_path

				# Если это аудиофайл
				elif file_name.lower().endswith(".mp3"):
					playlist_data["tracks"].append(file_path)

			# Добавляем плейлист в массив
			playlists.append(playlist_data)

	return playlists

# Функция для сохранения данных в файл playlist.js
def save_to_js_file(data, output_file):
	with open(output_file, "w", encoding="utf-8") as f:
		# Преобразуем данные в JSON и записываем в файл
		json_data = json.dumps(data, indent=4, ensure_ascii=False)
		f.write(f"{json_data}")

# Основная логика программы
if __name__ == "__main__":
	try:
		# Сканируем папку с плейлистами
		playlists = scan_playlists(PLAYLISTS_DIR)

		# Сохраняем данные в файл playlist.js
		save_to_js_file(playlists, OUTPUT_FILE)

		print(f"Файл {OUTPUT_FILE} успешно создан!")

	except Exception as e:
		print(f"Произошла ошибка: {e}")

	finally:
		input("Нажмите Enter для выхода...")