import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';
import { TaskVO } from 'src/vo/TaskVO';

@Injectable()
export class AppService {
    constructor(
        @Inject('PG') private clientPg: Client,
        @Inject('TASKS') private tasks: TaskVO[],
        // @Inject('API_KEY') private apiKey: string,
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
    ) {}

    getHello(): string {
        return `Hello World!`;
    }

    getTasks() {
        return new Promise((resolve, reject) => {
            this.clientPg.query(`SELECT * FROM tasks`, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            });
        });
    }

    getTasksApi() {
        return this.tasks;
    }
}
