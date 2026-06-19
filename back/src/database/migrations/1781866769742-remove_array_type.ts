import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveArrayType1781866769742 implements MigrationInterface {
    name = 'RemoveArrayType1781866769742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`session\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`session\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`session\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`session\` enum ('Lundi 20h - 23h', 'Mardi 20h - 23h', 'Jeudi 20h15 - 23h', 'Vendredi 20h - 23h', 'Samedi 9h - 11h') NULL`);
    }

}
