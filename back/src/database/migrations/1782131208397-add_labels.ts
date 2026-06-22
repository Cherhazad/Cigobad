import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLabels1782131208397 implements MigrationInterface {
    name = 'AddLabels1782131208397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`delete_at\` \`deleted_at\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`delete_at\` datetime(6) NULL`);
    }

}
