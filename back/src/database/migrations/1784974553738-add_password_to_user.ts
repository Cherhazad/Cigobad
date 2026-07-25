import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordToUser1784974553738 implements MigrationInterface {
    name = 'AddPasswordToUser1784974553738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    }

}
