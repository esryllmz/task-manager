import express from "express";
import cors from "cors";
import sql from "mssql";

// ——— en sade config (gerekirse burayı .env'e taşırsın)
const DB = {
  server: "localhost",   // SSMS'de "localhost,1433" yazıyorsun ama burada AYRI!
  port: 1433,            // Docker'da -p 1433:1433 ise 1433; farklıysa host portu
  user: "sa",
  password: "admin123456789",
  database: "taskdb"     // kendi DB adın (SmartStore_db vs.)
};

const sqlConfig = {
  user: DB.user,
  password: DB.password,
  database: DB.database,
  server: DB.server,
  port: DB.port,
  options: { encrypt: true, trustServerCertificate: true }
};

const app = express();
app.use(cors());
app.use(express.json());

let pool;
async function getPool() {
  if (!pool) pool = await sql.connect(sqlConfig);
  return pool;
}

// tabloyu garanti et (ilk çalıştırmada hata olmasın)
async function ensureTable() {
  const p = await getPool();
  await p.request().query(`
    IF DB_ID(N'${DB.database}') IS NULL
      CREATE DATABASE ${DB.database};
    IF OBJECT_ID('dbo.tasks') IS NULL
      CREATE TABLE dbo.tasks (
        id INT IDENTITY(1,1) PRIMARY KEY,
        [text] NVARCHAR(255) NOT NULL,
        done BIT NOT NULL DEFAULT 0,
        created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
      );
  `);
}

app.get("/", async (_req, res) => {
  try {
    const p = await getPool();
    const r = await p.request().query("SELECT DB_NAME() AS db");
    res.json({ ok: true, db: r.recordset[0].db });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/tasks", async (_req, res) => {
  try {
    const p = await getPool();
    const r = await p.request().query("SELECT * FROM dbo.tasks ORDER BY id DESC");
    res.json({ ok: true, data: r.recordset });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const text = (req.body?.text || "").trim();
    if (!text) return res.status(400).json({ ok: false, error: "Text required" });

    const p = await getPool();
    const ins = await p.request()
      .input("t", sql.NVarChar, text)
      .query("INSERT INTO dbo.tasks ([text], done) VALUES (@t, 0); SELECT SCOPE_IDENTITY() AS id;");
    const id = Number(ins.recordset[0].id);
    const rows = await p.request().input("id", sql.Int, id).query("SELECT * FROM dbo.tasks WHERE id=@id");
    res.status(201).json({ ok: true, data: rows.recordset[0] });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/tasks/:id/toggle", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const p = await getPool();
    await p.request().input("id", sql.Int, id)
      .query("UPDATE dbo.tasks SET done = IIF(done=1,0,1) WHERE id=@id;");
    const r = await p.request().input("id", sql.Int, id)
      .query("SELECT * FROM dbo.tasks WHERE id=@id;");
    res.json({ ok: true, data: r.recordset[0] });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const p = await getPool();
    await p.request().input("id", sql.Int, id).query("DELETE FROM dbo.tasks WHERE id=@id;");
    res.json({ ok: true, data: { id } });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

const PORT = 5000;
app.listen(PORT, async () => {
  await ensureTable();
  console.log(`API http://localhost:${PORT}`);
});
