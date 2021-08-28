import { UploadedFile } from "express-fileupload";
import { existsSync } from "fs";
import { unlink } from "fs/promises";
import { last } from "lodash";
import { join } from "path";

export default class StorageBucket {

	public publicPath: string;
	public systemPath: string;

	constructor(publicPath: string, systemPath: string) {
		this.publicPath = publicPath;
		this.systemPath = systemPath;
	}

	/**
	 * Stores the file to the system
	 * 
	 * @returns public path of uploaded file
	 */
	protected async store(file: UploadedFile, currentPublicPath?: string | null): Promise<string> {
		const { md5, name } = file;
		const ext = last(name.split(/\./g));
		const hashedName = `${md5}.${ext}`;
		const namespace = `${md5.substr(0, 2)}/${hashedName}`;

		const systemPath = join(this.systemPath, namespace);
		const publicPath = join(this.publicPath, namespace);

		if(currentPublicPath) {
			await this.delete(currentPublicPath);
		}

		await file.mv(systemPath);
		
		return publicPath;
	}

	/**
	 * Delete a file from the bucket
	 */
	public async delete(publicPath: string) {
		if(!publicPath.startsWith(this.publicPath)) {
			throw new Error("Invalid public path");
		}

		const namespace = publicPath.substr(this.publicPath.length);
		const systemPath = join(this.systemPath, namespace);

		if(existsSync(systemPath)) {
			await unlink(systemPath);
		}
	}

}