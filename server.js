require("dotenv").config();

const express = require("express");
const { getPassword, setPassword } = require("./lib/passwords");
const { connect, deleteInDB } = require("./lib/database");

const app = express();
app.use(express.json());
const port = 3030;

app.get("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  try {
    const value = await getPassword(name);
    if (!value) {
      response.status(500).send("Could find the password you were looking for");
      return;
    }
    response.send(value);
  } catch (e) {
    console.error(e);
    response.status(500).send("An internal server error occured");
  }
});

app.post("/api/passwords/", async (request, response) => {
  const password = request.body;

  try {
    await setPassword(password.name, password.value);
    response.send(`Your account ${password.name} was set`);
  } catch (e) {
    console.error(e);
    response.status(500).send("An unaccpected error occured");
  }
});

app.delete("/api/passwords/:name", async (request, response) => {
  try {
    const { name } = request.params;
    const result = await deleteInDB(name);
    if (result.deleteCount === 0) {
      return response.status(404).send("Couldn't find password");
    }
    response.status(400).send("password deleted");
  } catch (e) {
    console.error(e);
    response.status(500).send("unexpected error occured");
  }
});

async function run() {
  console.log("Connecting to database...");
  await connect(process.env.MONGO_DB_URI, process.env.MONGO_DB_NAME);
  console.log("Connected to database 🎉");

  app.listen(port, () => {
    console.log(`keymaster3000 API listening at https://localhost:${port}`);
  });
}
run();
