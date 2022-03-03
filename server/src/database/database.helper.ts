import { getConnection } from "typeorm";
import * as Path from 'path';
import * as fs from 'fs';
import log from "../logger";

interface Entity {
    name: string;
    tableName: string;
}

export abstract class DatabaseHelper {

    /**
   * Returns the entites of the database
   */
    static async getEntities() {
        const entities: Entity[] = [];
        (getConnection().entityMetadatas).forEach(
            x => entities.push({ name: x.name, tableName: x.tableName })
        );
        return entities;
    }

    /**
     * Cleans the database and reloads the entries
     */
    static async reloadFixtures() {
        const entities = await this.getEntities();
        await this.cleanAll(entities);
        await this.loadAll(entities);
    }

    /**
     * Cleans all the entities
     */
    static async cleanAll(entities: Entity[]) {
        try {
            for (const entity of entities) {
                const repository = getConnection().getRepository(entity.name);
                await repository.query(`DELETE FROM ${entity.tableName};`);
            }
            log.info("All entities cleaned");
        } catch (error) {
            log.error("Failed to clean all entities");
            throw new Error(`ERROR: Cleaning test db: ${error}`);
        }
    }
    /**
     * Cleans all the entities
     */
    static async cleanAllEntities() {
        try {
            const entities = await this.getEntities();
            for (const entity of entities) {
                const repository = getConnection().getRepository(entity.name);
                await repository.query(`DELETE FROM ${entity.tableName};`);
            }
            log.info("All entities cleaned");
        } catch (error) {
            log.error("Failed to clean all entities");
            throw new Error(`ERROR: Cleaning test db: ${error}`);
        }
    }

    /**
     * Insert the data from the src/test/fixtures folder
     */
    static async loadAll(entities: Entity[]) {
        try {
            for (const entity of entities) {
                const repository = getConnection().getRepository(entity.name);
                const fixtureFile = Path.join(__dirname, `../test/fixtures/${entity.name}.json`);
                if (fs.existsSync(fixtureFile)) {
                    const items = JSON.parse(fs.readFileSync(fixtureFile, 'utf8'));
                    await repository
                        .createQueryBuilder(entity.name)
                        .insert()
                        .values(items)
                        .execute();
                }
            }
            log.info("All entities loaded");
        } catch (error) {
            log.error("Failed to load existing fixtures");
            throw new Error(`ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`);
        }
    }
}
