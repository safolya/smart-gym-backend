

// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient({
//     datasources: {
//     db: {
//       url: process.env.DATABASE_URL, // ✅ Must be non-empty
//     },
//   },
// });

// module.exports = prisma;

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

module.exports = prisma;