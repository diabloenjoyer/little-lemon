import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");
const MENU_DB_NAME = "menu_items";

export const createMenuTable = async () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS ${MENU_DB_NAME} (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL UNIQUE, description TEXT NOT NULL, price DECIMAL NOT NULL, image VARCHAR NOT NULL, category VARCHAR NOT NULL);`,
				null,
				(_, outcome) => resolve(outcome),
				(_, error) => reject(error)
			);
		});
	});
};

export const getMenu = async () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`SELECT * FROM ${MENU_DB_NAME};`,
				null,
				(_, { rows }) => resolve(rows._array),
				(_, error) => reject(error)
			);
		});
	});
};

export const saveMenu = (menuObjArray) => {
	return new Promise((resolve, reject) => {
		db.transaction(async (tx) => {
			const placeholders = menuObjArray
				.map(() => `(?, ?, ?, ?, ?)`)
				.join(", ");

			const query = `INSERT INTO ${MENU_DB_NAME} (name, price, description, image, category) VALUES ${placeholders};`;
			const values = menuObjArray.flatMap((menuItem) => [
				menuItem.name,
				menuItem.price,
				menuItem.description,
				menuItem.image,
				menuItem.category,
			]);

			tx.executeSql(
				query,
				values,
				(_, { insertId }) => resolve(insertId),
				(_, error) => reject(error)
			);
		});
	});
};

export const filterMenu = async (q, categoryArray) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			const query = `SELECT * FROM ${MENU_DB_NAME} WHERE name LIKE ? AND category IN (${categoryArray
				.map(() => "?")
				.join(", ")});`;

			const params = [`%${q}%`, ...categoryArray];

			tx.executeSql(
				query,
				params,
				(_, { rows }) => resolve(rows?._array),
				(_, error) => reject(error)
			);
		});
	});
};

export const debugDropDb = async () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`DROP TABLE ${MENU_DB_NAME};`,
				null,
				(_, outcome) => resolve(outcome),
				(_, error) => reject(error)
			);
		});
	});
};
