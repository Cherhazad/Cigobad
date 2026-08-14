import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResetToken1786696812523 implements MigrationInterface {
    name = 'AddResetToken1786696812523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`resetToken\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`resetToken\``);
    }

}
