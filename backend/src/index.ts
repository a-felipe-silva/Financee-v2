import "dotenv/config";
import app from "./server";
import repository from "./data/repository";

app.listen(3000, async () => {
  try {
    await repository.sequelizeClient.authenticate();
    await repository.sequelizeClient.sync();

    console.log("Succesfuly connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database");
    console.error(error);
  }

  console.log("Server is running on http://localhost:3000");
});
