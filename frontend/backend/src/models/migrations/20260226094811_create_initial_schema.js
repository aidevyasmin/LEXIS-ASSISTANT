/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // 1. USERS (Admin/Lawyer only for now)
    .createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('username', 100).unique().notNullable();
      table.string('password', 255).notNullable(); // Hashed password
      table.enum('role', ['admin', 'lawyer']).defaultTo('admin');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    // 2. CLIENTS (Intake and screening)
    .createTable('clients', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('name', 255).notNullable();
      table.string('phone', 20).notNullable();
      table.enum('case_type', ['Civil', 'Criminal', 'Family', 'Property', 'Other']).notNullable();
      table.text('case_description').notNullable(); // Will be stored encrypted (AES-256)
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    // 3. APPOINTMENTS (Scheduling and tracking)
    .createTable('appointments', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('client_id').references('id').inTable('clients').onDelete('CASCADE');
      table.uuid('lawyer_id').references('id').inTable('users').onDelete('SET NULL');
      table.timestamp('start_time').notNullable();
      table.timestamp('end_time').notNullable();
      table.enum('status', ['pending', 'confirmed', 'cancelled', 'completed']).defaultTo('pending');
      table.string('google_event_id', 255).nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    // 4. PAYMENTS (Monetization and audit)
    .createTable('payments', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('appointment_id').references('id').inTable('appointments').onDelete('CASCADE');
      table.decimal('amount', 10, 2).notNullable();
      table.enum('status', ['pending', 'verified', 'rejected']).defaultTo('pending');
      table.string('payment_proof_url', 500).nullable(); // URL to the uploaded screenshot
      table.text('transaction_log').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('payments')
    .dropTableIfExists('appointments')
    .dropTableIfExists('clients')
    .dropTableIfExists('users');
};
