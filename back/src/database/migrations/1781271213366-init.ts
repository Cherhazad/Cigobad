import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1781271213366 implements MigrationInterface {
    name = 'Init1781271213366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`birthDate\` datetime NOT NULL, \`city\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`level\` varchar(255) NOT NULL, \`formula\` varchar(255) NOT NULL, \`discount\` varchar(255) NOT NULL, \`isAccepted\` tinyint NOT NULL, \`hasPaid\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
