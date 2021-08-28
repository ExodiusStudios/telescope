import path, { join } from "path";
import { Project, User } from "@prisma/client";
import { database } from "..";
import { resolveData } from "../util/helpers";
import StorageBucket from "../util/bucket";
import { UploadedFile } from "express-fileupload";

const COVER_SYSTEM_PATH = resolveData("public/cover/");
const COVER_PUBLIC_PATH = '/data/cover/';

export default class CoverStorage extends StorageBucket {

	public constructor() {
		super(COVER_PUBLIC_PATH, COVER_SYSTEM_PATH);
	}

	/**
	 * Sets the currently loaded file as the cover image of a project
	 * 
	 * @param file UploadedFile to set as cover
	 * @param project The project
	 */
	public async storeCover(file: UploadedFile, project: Project) {
		const path = await super.store(file, project.coverImage);

		// set as cover in the database
		await database.project.update({
			where: {
				id: project.id
			},
			data: {
				coverImage: path
			}
		});
	}

}