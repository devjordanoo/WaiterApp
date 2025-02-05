import express from "express";
import { initializeContainer } from "@/utils/di/container";
import { DATABASE_TOKEN } from "@/utils/di/tokens";
import Cors from "cors";

import { initializeRoutes } from "./router";

const app = express();
const PORT = process.env.APP_PORT || 3000;
const container = initializeContainer();

const PrismaClient = container.get(DATABASE_TOKEN);

const corsOptions = {
	origin: "*", // Ou '*' se quiser permitir todas as origens
	credentials: true,
	optionsSuccessStatus: 200
};

PrismaClient.connect()
	.then(() => {
		console.log("Connected to database");

		app.use(express.json());
		app.use(Cors(corsOptions));
		app.use((req, res, next) => {
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
			res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
			next();
		});

		app.use("/api", initializeRoutes(container));

		app.listen(3001, () => {
			console.log(`Listening on port ${PORT}`);
			console.log(`http://localhost:${PORT}/`);
		});
	})
	.catch((err) => {
		console.log("Não foi possivel conectar com a base de dados");
		console.error(err);
	});

export default app;

