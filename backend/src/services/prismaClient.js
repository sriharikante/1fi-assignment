// Single shared PrismaClient instance for the whole app.
// Reusing one instance avoids exhausting the Postgres connection pool.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
