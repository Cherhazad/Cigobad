import { MigrationInterface, QueryRunner } from "typeorm";

export class FixResetTokenColumn1786713858069 implements MigrationInterface {
    name = 'FixResetTokenColumn1786713858069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`resetToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`resetToken\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`resetToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`resetToken\` varchar(255) NULL`);
    }

}
