import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullable1781866483549 implements MigrationInterface {
    name = 'AddNullable1781866483549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`licenceNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`city\` \`city\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`category\` \`category\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`level\` \`level\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`session\` \`session\` enum ('Lundi 20h - 23h', 'Mardi 20h - 23h', 'Jeudi 20h15 - 23h', 'Vendredi 20h - 23h', 'Samedi 9h - 11h') NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`formula\` \`formula\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`discount\` \`discount\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isAccepted\` \`isAccepted\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`hasPaid\` \`hasPaid\` tinyint NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`hasPaid\` \`hasPaid\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isAccepted\` \`isAccepted\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`discount\` \`discount\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`formula\` \`formula\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`session\` \`session\` enum ('Lundi 20h - 23h', 'Mardi 20h - 23h', 'Jeudi 20h15 - 23h', 'Vendredi 20h - 23h', 'Samedi 9h - 11h') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`level\` \`level\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`category\` \`category\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`city\` \`city\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`licenceNumber\``);
    }

}
