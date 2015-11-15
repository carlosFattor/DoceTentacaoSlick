# --- !Ups
ALTER TABLE "contact" ADD "phone" VARCHAR

# --- !Downs
ALTER TABLE "contact" DROP COLUMN "phone"


