import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUserAndSessionTables1784307087938 implements MigrationInterface {
    name = 'FixUserAndSessionTables1784307087938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session_attendees_user\` DROP FOREIGN KEY \`FK_940492fbc80237c387a5a6220ac\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` varchar(255) NULL DEFAULT 'USER'`);
        await queryRunner.query(`ALTER TABLE \`session_attendees_user\` ADD CONSTRAINT \`FK_940492fbc80237c387a5a6220ac\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session_attendees_user\` DROP FOREIGN KEY \`FK_940492fbc80237c387a5a6220ac\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`session_attendees_user\` ADD CONSTRAINT \`FK_940492fbc80237c387a5a6220ac\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
