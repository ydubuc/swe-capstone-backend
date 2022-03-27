import { Migration } from '@mikro-orm/migrations';

export class Migration20220322201402 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` text not null, `first_name` text not null, `last_name` text not null, `email` text not null, `salt` text not null, `password` text not null, `updated_at` datetime not null, `created_at` datetime not null, primary key (`id`));');
    this.addSql('create unique index `user_email_unique` on `user` (`email`);');

    this.addSql('create table `ticket` (`id` integer not null primary key autoincrement, `title` text not null, `description` text not null, `priority` text check (`priority` in (\'high\', \'medium\', \'low\')) not null, `status` text check (`status` in (\'active\', \'closed\')) not null, `updated_at` datetime not null, `created_at` datetime not null);');
  }

}
