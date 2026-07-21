import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateAndUpdateOpenedByToSessionTable1784622630027 implements MigrationInterface {
    name = 'AddDateAndUpdateOpenedByToSessionTable1784622630027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` DROP COLUMN \`openedById\``);
        await queryRunner.query(`ALTER TABLE \`session\` ADD \`openedBy\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD \`date\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`session\` DROP COLUMN \`openedBy\``);
        await queryRunner.query(`ALTER TABLE \`session\` ADD \`openedById\` int NULL`);
    }

}
