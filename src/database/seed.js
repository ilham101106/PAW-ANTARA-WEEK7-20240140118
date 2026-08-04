/**
 * @file Seeder untuk bikin user demo, karena register belum diimplementasi.
 * Cara pakai: npm run seed
 */

const db = require("../config/database");
const User = require("../models/user.model");

const dummyUsers = [
  { name: "Admin User", email: "admin@example.com", password: "12345678" },
  { name: "User", email: "user@example.com", password: "12345678" },
];

console.log("🌱 Mulai seeding database...\n");

for (const dummy of dummyUsers) {
  const existing = User.findByEmail(dummy.email);
  if (existing) {
    console.log(`⏭️  Skip: ${dummy.email} sudah ada.`);
    continue;
  }
  User.create(dummy);
  console.log(
    `✅ Berhasil membuat user: ${dummy.email} (password asli: ${dummy.password})`,
  );
}

console.log("\n🌱 Seeding selesai.");
db.close();
