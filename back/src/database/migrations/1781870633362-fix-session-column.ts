import { MigrationInterface, QueryRunner } from "typeorm";

export class FixSessionColumn1781870633362 implements MigrationInterface {
    name = 'FixSessionColumn1781870633362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`session\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`session\` set ('Lundi 20h - 23h', 'Mardi 20h - 23h', 'Jeudi 20h15 - 23h', 'Vendredi 20h - 23h', 'Samedi 9h - 11h') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`session\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`session\` enum ('Lundi 20h - 23h', 'Mardi 20h - 23h', 'Jeudi 20h15 - 23h', 'Vendredi 20h - 23h', 'Samedi 9h - 11h') NULL`);
    }

}
