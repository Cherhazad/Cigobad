import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSessionTable1784301934837 implements MigrationInterface {
    name = 'AddSessionTable1784301934837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`session\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`level\` varchar(255) NOT NULL, \`hours\` varchar(255) NOT NULL, \`openedById\` int NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`session_attendees_user\` (\`sessionId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_2c16beb515dfccba8a78c5a04e\` (\`sessionId\`), INDEX \`IDX_940492fbc80237c387a5a6220a\` (\`userId\`), PRIMARY KEY (\`sessionId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`session_attendees_user\` ADD CONSTRAINT \`FK_2c16beb515dfccba8a78c5a04e8\` FOREIGN KEY (\`sessionId\`) REFERENCES \`session\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`session_attendees_user\` ADD CONSTRAINT \`FK_940492fbc80237c387a5a6220ac\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session_attendees_user\` DROP FOREIGN KEY \`FK_940492fbc80237c387a5a6220ac\``);
        await queryRunner.query(`ALTER TABLE \`session_attendees_user\` DROP FOREIGN KEY \`FK_2c16beb515dfccba8a78c5a04e8\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
        await queryRunner.query(`DROP INDEX \`IDX_940492fbc80237c387a5a6220a\` ON \`session_attendees_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_2c16beb515dfccba8a78c5a04e\` ON \`session_attendees_user\``);
        await queryRunner.query(`DROP TABLE \`session_attendees_user\``);
        await queryRunner.query(`DROP TABLE \`session\``);
    }

}
