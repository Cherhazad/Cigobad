import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCommentColumn1781949968471 implements MigrationInterface {
    name = 'AddCommentColumn1781949968471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`comment\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`comment\``);
    }

}
