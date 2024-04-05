'use strict'
const connection = require('../../config/connection');

class Task {
    static async all() {
        try {
            const database = await connection
            const [rows] = await database.execute('SELECT * FROM tasks');

            const tasks = rows.map(row => ({
                id: row.id,
                title: row.title,
                description: row.description,
                favorite: row.favorite,
                color: row.color,
                created_at: row.created_at,
                updated_at: row.updated_at
            }));

            return tasks;
        } catch (error) {
            console.error('Error ao buscar todas as tarefas:', error.message);
            throw error;
        }
    }

    static async find(id: number) {
        try {
            const database = await connection
            const [rows] = await database.execute('SELECT * FROM tasks where id = ' + id);

            if (rows.length == 0)
                return 'Tarefa não encontrada.';

            const task = rows[0];
            return {
                id: task.id,
                title: task.title,
                description: task.description,
                favorite: task.favorite,
                color: task.color,
                created_at: task.created_at,
                updated_at: task.updated_at
            };
        } catch (error) {
            console.error('Error ao buscar todas as tarefas:', error.message);
            throw error;
        }
    }

    static async create(data: any) {
        try {
            const database = await connection

            await database.execute(
                'INSERT INTO tasks (title, description, favorite, color) VALUES (?, ?, ?, ?)',
                [data.title, data.description, data.favorite, data.color]
            );
            return data.title;
        } catch (error) {
            console.error('Erro ao criar tarefa:', error.message);
            throw error;
        }
    }

    static async update(id: number, data: any) {
        try {
            const database = await connection
            const [result] = await database.execute(
                'UPDATE tasks SET title = ?, description = ?, favorite = ?, color = ? WHERE id = ?',
                [data.title, data.description, data.favorite, data.color, id]
            );

            if (result.affectedRows === 0) {
                throw new Error(`Tarefa com ID ${id} não encontrada`);
            }
            return id;
        } catch (error) {
            console.error(`Erro ao atualizar tarefa com ID ${id}:`, error.message);
            throw error;
        }
    }

    static async delete(id: number) {
        try {
            const database = await connection
            const [result] = await database.execute(
                'DELETE from tasks WHERE id = ?', [id]
            );

            if (result.affectedRows === 0) {
                throw new Error(`Tarefa com ID ${id} não encontrada`);
            }
            return id;
        } catch (error) {
            console.error(`Erro ao deletar tarefa com ID ${id}:`, error.message);
            throw error;
        }
    }
}

module.exports = Task;
