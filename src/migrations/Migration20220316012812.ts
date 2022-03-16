import { Migration } from '@mikro-orm/migrations';

export class Migration20220316012812 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "salt" varchar(255) not null, "password" varchar(255) not null, "updated_at" timestamptz(0) not null, "created_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');

    this.addSql('create table "ticket" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "priority" text check ("priority" in (\'high\', \'medium\', \'low\')) not null, "status" text check ("status" in (\'active\', \'closed\')) not null, "updated_at" timestamptz(0) not null, "created_at" timestamptz(0) not null);');
  }

}
