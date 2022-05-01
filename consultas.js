const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "softlife",
    password: "graficas014",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
});

const guardarUsuario = async (usuario) => {
    const values = Object.values(usuario);
    const consulta = {
        text:
            "insert into usuarios (email, password) values ($1, $2)",
        values,
    };
    const result = await pool.query(consulta);
    return result;
};

const logearUsuario = async (usuario) => {
    try {
        const consulta = {
            text: "select * from usuarios where email = $1 and password = $2",
            values: usuario,
        }
        const result = await pool.query(consulta);
        return result;
    } catch (err) {
        console.log(err.code);
    }
}

const getUsuarios = async () => {
    const result = await pool.query("select * from usuarios");
    return result.rows;
};

module.exports = {
    guardarUsuario,
    logearUsuario,
    getUsuarios
};