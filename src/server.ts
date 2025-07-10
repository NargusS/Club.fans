import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";
import { authRoutes } from "./routes/authRoutes";
import { profileRoutes } from "./routes/profileRoutes";
import { mediaRoutes } from "./routes/mediaRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});

app.use(logger);

app.use("/auth", authRoutes);
app.use("/creators", profileRoutes);
app.use("/", mediaRoutes);

app.get("/health", (req, res) => {
	res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use('*', (req, res) => {
	res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
