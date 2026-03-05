
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/db/schema.ts",
  out: "src/db/out",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:8520@localhost:5432/chirpy?sslmode=disable",
  },
});