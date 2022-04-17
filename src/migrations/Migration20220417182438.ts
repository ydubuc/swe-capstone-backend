import { Migration } from '@mikro-orm/migrations';

export class Migration20220417182438 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "salt" varchar(255) not null, "password" varchar(255) not null, "updated_at" timestamptz(0) not null, "created_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');

    this.addSql('create table "ticket" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "priority" text check ("priority" in (\'high\', \'medium\', \'low\')) not null, "status" text check ("status" in (\'active\', \'closed\')) not null, "user_id" varchar(255) not null, "updated_at" timestamptz(0) not null, "created_at" timestamptz(0) not null);');

    this.addSql('alter table "ticket" add constraint "ticket_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ticket" drop constraint "ticket_user_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "ticket" cascade;');
  }

}
