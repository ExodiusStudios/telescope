import consola, { LogLevel } from "consola";

import { DatabaseService } from "./database";
import { ExtensionService } from "./extensions";
import { HTTPService } from "./http";
import { MailingService } from "./mailer";
import ON_DEATH from 'death';
import fs from 'fs';
import { isProduction } from "./util/helpers";
import { readConfig } from "./util/config";
import { registerModels } from "./registry/models";
import { registerSchemas } from "./registry/schemas";

// Assert CLI bootstrap
if(process.env.VINDIGO_CLI !== 'true') {
	throw new Error('Vindigo Server must be launched from the CLI');
}

const production = isProduction();
const config = readConfig();
const logger = consola.create({
	level: production ? LogLevel.Info : LogLevel.Debug
});

// Nodemon does not send a kill signal causing
// port binding issues. When running in development,
// the current pid is saved for later killing.
const PID_FILE = '.pid';

if(!production) {
	if(fs.existsSync(PID_FILE)) {
		const pid = fs.readFileSync(PID_FILE, 'utf8');

		try {
			process.kill(parseInt(pid));
			logger.info('Killed previous instance');
		} catch(err) {
			logger.warn('Failed to kill previous instance');
		}
	}

	fs.writeFileSync(PID_FILE, process.pid.toString());
}

// Define the services
const extensions = new ExtensionService(config);
const database = new DatabaseService(config);
const mailer = new MailingService(config);
const http = new HTTPService(config);

export {
	config,
	extensions,
	database,
	logger,
	mailer,
	http
};

registerModels();
registerSchemas();

(async () => {
	try {
		await database.start();
		await http.start();
	} catch(err) {
		logger.error(err);
		process.exit(0);
	}
})();

ON_DEATH(() => {
	http.stop();  
	database.stop();

	if(!production) {
		fs.unlinkSync(PID_FILE);
	}

	process.exit(0);
});