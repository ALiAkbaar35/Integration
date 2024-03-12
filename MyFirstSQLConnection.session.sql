import { createConnection }
from 'mysql';
const db = createConnection(
    { host: "localhost",
    user: "root",
    password: "",
    database :"testing" }
) export default db;