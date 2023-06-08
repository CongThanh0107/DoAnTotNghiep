import mysql from 'mysql';
import connection from '../config/database';

export default class BaseRepository {
	private connection: mysql.Connection;
	private readonly tableName: string;
	private whereClause: string;
	private whereValues: Array<any>;
	private joinClause: string;

	constructor(tableName: string) {
		this.connection = connection;
		this.tableName = tableName;
		this.whereClause = '';
		this.whereValues = [];
		this.joinClause = '';
	}

	async executeQuery(sql: string, values?: Array<object> | object): Promise<any> {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, values, (error, results) => {
				if (error) {
					reject(error);
				} else {
					resolve(results);
				}
			});
		});
	}

	where(condition: string, values: Array<any>): BaseRepository {
		this.whereClause = `WHERE ${condition}`;
		this.whereValues = values;
		return this;
	}

	andWhere(condition: string, values: Array<any>): BaseRepository {
		if (this.whereClause === '') {
			this.whereClause = `WHERE ${condition}`;
		} else {
			this.whereClause += ` AND ${condition}`;
		}
		this.whereValues = this.whereValues.concat(values);
		return this;
	}

	join(joinTable: string, joinCondition: string): BaseRepository {
		this.joinClause = `JOIN ${joinTable} ON ${joinCondition}`;
		return this;
	}

	async getAll(limit = 10, page = 1): Promise<Array<object>> {
		const sql = `SELECT * FROM ${this.tableName} ${this.joinClause} ${this.whereClause} LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
		return await this.executeQuery(sql, this.whereValues);
	}

	async getOne(): Promise<object> {
		const sql = `SELECT * FROM ${this.tableName} ${this.joinClause} ${this.whereClause} LIMIT 1`;
		const data: Array<object> =  await this.executeQuery(sql, this.whereValues);
		return data[0];
	}

	async getById(id: string): Promise<object> {
		return await this.where('id = ?', [id]).getOne();
	}

	async create(data: object): Promise<object> {
		const sql = `INSERT INTO ${this.tableName} SET ?`;
		return await this.executeQuery(sql, data);
	}

	async update(id: string, data: object): Promise<object> {
		const sql = `UPDATE ${this.tableName} SET ? WHERE id = ? ${this.whereClause}`;
		return await this.executeQuery(sql, [data, id, ...this.whereValues]);
	}

	async delete(id: string): Promise<object> {
		const sql = `DELETE FROM ${this.tableName} WHERE id = ? ${this.whereClause}`;
		return await this.executeQuery(sql, [id, ...this.whereValues]);
	}
}