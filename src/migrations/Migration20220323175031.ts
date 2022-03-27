import { Migration } from '@mikro-orm/migrations';

export class Migration20220323175031 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `ticket` add column `user_id` text not null constraint ticket_user_id_foreign references `user` (`id`) on update cascade;');
    this.addSql('create index `ticket_user_id_index` on `ticket` (`user_id`);');
  }

}
