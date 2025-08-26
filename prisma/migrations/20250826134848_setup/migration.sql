-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."account" (
    "id" TEXT NOT NULL,
    "password" TEXT,
    "disabled" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."linked_accounts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_user_id" TEXT,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "linked_accounts_pkey" PRIMARY KEY ("id","email")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tenant" (
    "id" TEXT NOT NULL,
    "icon" TEXT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TenantAccount" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactEmail" (
    "id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT 'work',
    "email" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactPhone" (
    "id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT 'mobile',
    "countryCode" TEXT,
    "number" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactPhone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactNote" (
    "id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "account_id_disabled_idx" ON "public"."account"("id", "disabled");

-- CreateIndex
CREATE UNIQUE INDEX "linked_accounts_email_key" ON "public"."linked_accounts"("email");

-- CreateIndex
CREATE INDEX "linked_accounts_email_status_idx" ON "public"."linked_accounts"("email", "status");

-- CreateIndex
CREATE INDEX "session_user_id_idx" ON "public"."session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_slug_key" ON "public"."Tenant"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TenantAccount_tenant_id_user_id_key" ON "public"."TenantAccount"("tenant_id", "user_id");

-- CreateIndex
CREATE INDEX "Contact_tenantId_created_at_idx" ON "public"."Contact"("tenantId", "created_at");

-- CreateIndex
CREATE INDEX "ContactEmail_email_idx" ON "public"."ContactEmail"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ContactEmail_contact_id_email_key" ON "public"."ContactEmail"("contact_id", "email");

-- CreateIndex
CREATE INDEX "ContactPhone_number_idx" ON "public"."ContactPhone"("number");

-- CreateIndex
CREATE UNIQUE INDEX "ContactPhone_contact_id_number_key" ON "public"."ContactPhone"("contact_id", "number");

-- CreateIndex
CREATE INDEX "ContactNote_contact_id_idx" ON "public"."ContactNote"("contact_id");

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."linked_accounts" ADD CONSTRAINT "linked_accounts_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TenantAccount" ADD CONSTRAINT "TenantAccount_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TenantAccount" ADD CONSTRAINT "TenantAccount_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContactEmail" ADD CONSTRAINT "ContactEmail_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "public"."Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContactPhone" ADD CONSTRAINT "ContactPhone_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "public"."Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContactNote" ADD CONSTRAINT "ContactNote_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "public"."Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
