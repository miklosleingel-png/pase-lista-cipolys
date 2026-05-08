const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors({
  origin: [
    "https://miklosleingel-png.github.io",
    "http://localhost:3000",
    "http://localhost:5000",
  ],
  methods: ["GET","POST","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));
app.options("*", cors());
app.use(express.json());

// Conexión a PostgreSQL (Railway inyecta DATABASE_URL automáticamente)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ── INICIALIZAR TABLA ──────────────────────────────────────────
const INIT_DATA = [
  ["AGUILA LUNA CATALINO","No académico"],
  ["AGUILAR PEREZ MIRZA","No académico"],
  ["AGUILERA CARCAMO EVA","No académico"],
  ["BAUTISTA ALVAREZ JAVIER","No académico"],
  ["BECERRA GARCIA LILIA","No académico"],
  ["CRUZ CHAZARI GONZALO","No académico"],
  ["DIAZ VAZQUEZ ROGELIO","No académico"],
  ["DOMINGUEZ ROMERO MARTHA","No académico"],
  ["GONZALEZ VELAZQUEZ JUAN PABLO","No académico"],
  ["MAYORGA GALLARDO OMAR EDUARDO","No académico"],
  ["PEREA SANCHEZ CARLOS GILBERTO","No académico"],
  ["QUIROZ ALVARADO REBECA","No académico"],
  ["TEUTLE ORTEGA BERENICE HORTENSIA","No académico"],
  ["AGUILAR BALDERAS LIDIA","Posgrado"],
  ["ARELLANES JIMENEZ PAULINO ERNESTO","Posgrado"],
  ["ARROYO GARCIA ISRAEL","Posgrado"],
  ["CANO ROBLES ALFONSO","Posgrado"],
  ["CANSINO ORTIZ CESAR RICARDO","Posgrado"],
  ["COUTIÑO OSORIO PATRICIA FABIOLA","Posgrado"],
  ["GERONIMO CASTILLO FABIAN ALEJANDRO","Posgrado"],
  ["MORENO VELADOR OCTAVIO HUMBERTO","Posgrado"],
  ["PEREZ DIAZ MARISOL","Posgrado"],
  ["SANCHEZ ESPINOZA FRANCISCO","Posgrado"],
  ["AGUILAR DAZA MELQUIADES GREGORIO","Ciencias Políticas"],
  ["ALDECO PAZ JULIO FERNANDO","Ciencias Políticas"],
  ["AMARO ZAHUANTITLA GUSTAVO","Ciencias Políticas"],
  ["ARGUELLES GOMEZ MARIA MARGARITA","Ciencias Políticas"],
  ["BALBUENA AGISS ZENY","Ciencias Políticas"],
  ["BARRIOS HERNANDEZ BEATRIZ","Ciencias Políticas"],
  ["CALVILLO BARRIOS JUAN","Ciencias Políticas"],
  ["CAMPOS LOPEZ XOCHITL PATRICIA","Ciencias Políticas"],
  ["CANALES DE LA FUENTE EMMA ALICIA","Ciencias Políticas"],
  ["CARRILLO CORNEJO RODOLFO","Ciencias Políticas"],
  ["CASTAÑEDA ARAUJO PABLO","Ciencias Políticas"],
  ["CASTAÑEDA TENORIO ENRIQUE","Ciencias Políticas"],
  ["CEPEDA ARELLANO YESSIKA MABEL","Ciencias Políticas"],
  ["DE LA FUENTE MORALES CLAUDIA GUADALUPE","Ciencias Políticas"],
  ["FLORES FLORES ERIKA","Ciencias Políticas"],
  ["GARCIA GARCIA EDGAR PASCUAL","Ciencias Políticas"],
  ["GARCIA HERNANDEZ ERASMO","Ciencias Políticas"],
  ["HERNANDEZ MAIMONE MANUEL ALEJANDRO","Ciencias Políticas"],
  ["HERNANDEZ MANZANILLA FATIMA","Ciencias Políticas"],
  ["HERNANDEZ SALAZAR JULIAN","Ciencias Políticas"],
  ["JIMENEZ MORALES OSCAR ANTONIO","Ciencias Políticas"],
  ["LOPEZ GARCIA CLAUDIA","Ciencias Políticas"],
  ["MARTIN GARCIA ALESANDRA","Ciencias Políticas"],
  ["MEJIA ROSAS CRISTOPHER","Ciencias Políticas"],
  ["MIQUEL HERNANDEZ MONTSERRAT","Ciencias Políticas"],
  ["MUNGUIA SALAZAR ALEX","Ciencias Políticas"],
  ["OLIVER TENORIO ALFONSO WILLEBALDO","Ciencias Políticas"],
  ["PONCE CARRILLO OMAR ANTONIO","Ciencias Políticas"],
  ["REYES RONQUILLO MARIA DEL CORAL","Ciencias Políticas"],
  ["RIVERA GONZALEZ HERVEY","Ciencias Políticas"],
  ["SANCHEZ JIMENEZ JOSE GUADALUPE","Ciencias Políticas"],
  ["SANCHEZ JUAREZ JORGE RENE","Ciencias Políticas"],
  ["SERAFIN CASTRO ALEXEI DANIEL","Ciencias Políticas"],
  ["TOBON RAMIREZ MARIA DE JESUS OFELIA","Ciencias Políticas"],
  ["TORRES VILLEGAS LAURA ELIZABETH","Ciencias Políticas"],
  ["VELAZQUEZ CABALLERO DIEGO MARTIN","Ciencias Políticas"],
  ["VIDAL URRUTIA JORGE ALBERTO","Ciencias Políticas"],
  ["ACEVEDO CISNEROS CIRO ADRIAN","Relaciones Internacionales"],
  ["ALVAREZ PEREZ MARCELA","Relaciones Internacionales"],
  ["AMADOR VAZQUEZ SAMUEL","Relaciones Internacionales"],
  ["BARRIENTOS OVIEDO HOBART DANIEL","Relaciones Internacionales"],
  ["CEREZO MORALES NORMA BERTHA","Relaciones Internacionales"],
  ["CONTRERAS PERALTA JORGE","Relaciones Internacionales"],
  ["CRIVELLI MINUTTI EDUARDO","Relaciones Internacionales"],
  ["CRUZ CARVAJAL CRISTINA","Relaciones Internacionales"],
  ["CUAHUTLE ZAMORA YOBANNI","Relaciones Internacionales"],
  ["ELIAS MIRANDA VICTOR MANUEL","Relaciones Internacionales"],
  ["FLORES VAZQUEZ TANIA BELINDA","Relaciones Internacionales"],
  ["GARCIA MARTINEZ HERON","Relaciones Internacionales"],
  ["GONZALEZ PEREYRA ROCIO","Relaciones Internacionales"],
  ["LABARREDA GONZALEZ JORGE","Relaciones Internacionales"],
  ["MANTILLA GALVEZ DIANA KARINA","Relaciones Internacionales"],
  ["MARQUEZ AMADO ROSA ISABEL","Relaciones Internacionales"],
  ["MORALES MORENO ISIDRO","Relaciones Internacionales"],
  ["MORENO ROSANO MARIA PATRICIA","Relaciones Internacionales"],
  ["NAVA GALICIA MARTHA CONSUELO","Relaciones Internacionales"],
  ["NETZAHUALCOYOTZI LUNA RAUL","Relaciones Internacionales"],
  ["OCHOA BILBAO LUIS","Relaciones Internacionales"],
  ["OCMAN AZUETA CLAUDIA ANAIT","Relaciones Internacionales"],
  ["ORTEGA RAMIREZ ADRIANA SLETZA","Relaciones Internacionales"],
  ["PEREZ GOMEZ JOSE ALBERTO","Relaciones Internacionales"],
  ["PRADO LALLANDE JUAN PABLO","Relaciones Internacionales"],
  ["RAMIREZ NECOECHEA JOSE RAUL","Relaciones Internacionales"],
  ["RAMIREZ TORRES JULIETA","Relaciones Internacionales"],
  ["REGALADO MUJICA ROGELIO","Relaciones Internacionales"],
  ["RODRIGUEZ AÑUEZ MYRNA","Relaciones Internacionales"],
  ["RODRIGUEZ ORTIZ GUILLERMO ALBERTO","Relaciones Internacionales"],
  ["RODRIGUEZ SUAREZ PEDRO MANUEL","Relaciones Internacionales"],
  ["ROMERO ORDUÑA LINDA MARGARITA","Relaciones Internacionales"],
  ["RONCAL VATTUONE ELSA XIMENA","Relaciones Internacionales"],
  ["SANCHEZ GAVI JOSE LUIS","Relaciones Internacionales"],
  ["SEGURA LANDA NORMA ADA","Relaciones Internacionales"],
  ["TALAVERA SARDANETA EDUARDO","Relaciones Internacionales"],
  ["TAPIA MARCHINA STEFANIA","Relaciones Internacionales"],
  ["VAZQUEZ DE LARA CISNEROS JOSE RAUL","Relaciones Internacionales"],
  ["VERGARA ORTEGA BLANCA EDITH","Relaciones Internacionales"],
  ["AGUILAR PEREZ MIRZA","Sociología"],
  ["BALLEN GUACHETA ELIZABETH","Sociología"],
  ["CALDERON MORILLON OSCAR","Sociología"],
  ["DAVILA GARCIA DANIELA","Sociología"],
  ["ECHEGOLLEN GUZMAN MAYLETH","Sociología"],
  ["GARZON SERRANO JOEL DAVID","Sociología"],
  ["HERNANDEZ DE GANTE MA. ALICIA","Sociología"],
  ["LOPEZ ANGEL GUSTAVO","Sociología"],
  ["MACIP RIOS RICARDO FRANCISCO","Sociología"],
  ["MENDOZA LOPEZ KAREN","Sociología"],
  ["RAMIREZ HERNANDEZ FELIPE ANTONIO","Sociología"],
  ["RIVERA ARIZA GUILLERMO","Sociología"],
  ["ROCHA MANILLA RAMON CARLOS","Sociología"],
  ["SANCHEZ TORRES RODRIGO","Sociología"],
  ["SANTIBAÑEZ ANALCO MONSERRATH","Sociología"],
  ["TREJO SANTOS ENRIQUE","Sociología"],
  ["JARAMILLO TORRES ANGEL","No identificado"],
  ["MONDRAGON TOLEDO GABRIEL","No identificado"],
  ["EVANGELINA M. CORONA","No identificado"],
];

async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS personas (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        sector TEXT NOT NULL,
        asistencia BOOLEAN DEFAULT FALSE,
        voto TEXT DEFAULT NULL,
        actualizado TIMESTAMP DEFAULT NOW()
      )
    `);
    const { rows } = await client.query("SELECT COUNT(*) FROM personas");
    if (parseInt(rows[0].count) === 0) {
      for (const [nombre, sector] of INIT_DATA) {
        await client.query(
          "INSERT INTO personas (nombre, sector) VALUES ($1, $2)",
          [nombre, sector]
        );
      }
      console.log("✅ Base de datos inicializada con", INIT_DATA.length, "personas");
    }
  } finally {
    client.release();
  }
}

// ── RUTAS ──────────────────────────────────────────────────────

// GET /personas — obtener todos
app.get("/personas", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM personas ORDER BY sector, nombre"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /personas/:id — actualizar asistencia/voto
app.patch("/personas/:id", async (req, res) => {
  const { id } = req.params;
  const { asistencia, voto, sector } = req.body;
  try {
    const fields = [];
    const values = [];
    let i = 1;
    if (asistencia !== undefined) { fields.push(`asistencia=$${i++}`); values.push(asistencia); }
    if (voto !== undefined)       { fields.push(`voto=$${i++}`);       values.push(voto); }
    if (sector !== undefined)     { fields.push(`sector=$${i++}`);     values.push(sector); }
    fields.push(`actualizado=NOW()`);
    values.push(id);
    const q = `UPDATE personas SET ${fields.join(",")} WHERE id=$${i} RETURNING *`;
    const { rows } = await pool.query(q, values);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /personas — agregar persona
app.post("/personas", async (req, res) => {
  const { nombre, sector } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO personas (nombre, sector) VALUES ($1, $2) RETURNING *",
      [nombre, sector]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /personas/:id — eliminar persona
app.delete("/personas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM personas WHERE id=$1", [id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /reset — limpiar asistencia y votos
app.post("/reset", async (req, res) => {
  try {
    await pool.query("UPDATE personas SET asistencia=FALSE, voto=NULL, actualizado=NOW()");
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get("/", (req, res) => res.json({ status: "ok", app: "CIPOLYS Pase de Lista" }));

// ── ARRANQUE ───────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
initDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
}).catch(err => {
  console.error("Error iniciando DB:", err);
  process.exit(1);
});
