import { app } from "./app";

app.listen(3333, "0.0.0.0", () => {
  console.log(`[server]: Server is running at http://localhost:${3333}`);
});
