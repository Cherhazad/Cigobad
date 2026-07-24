import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableColumnsToSessionAndUser1784879808096 implements MigrationInterface {
    name = 'AddNullableColumnsToSessionAndUser1784879808096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`birthDate\` \`birthDate\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`session\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`session\` CHANGE \`level\` \`level\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`session\` CHANGE \`hours\` \`hours\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`session\` CHANGE \`date\` \`date\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` CHANGE \`date\` \`date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`session\` CHANGE \`hours\` \`hours\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`session\` CHANGE \`level\` \`level\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`session\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`birthDate\` \`birthDate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` varchar(255) NOT NULL`);
    }

}
