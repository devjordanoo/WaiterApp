import express from "express";
import PrismaClient from "./database/Prisma";

const app = express();
const PORT = process.env.APP_PORT || 3000;

PrismaClient.connect()
	.then(() => {
		console.log("Connected to database");
		app.get("/", (req, res) => {
			res.send("Hello Thwere 222!");
		});

		app.listen(3001, () => {
			console.log(`Listening on port ${PORT}`);
			console.log(`http://localhost:${PORT}/`);
		});
	})
	.catch((err) => {
		console.log("Não foi possivel conectar com a base de dados");
		console.error(err);
	});

