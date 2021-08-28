import path, { join } from "path";

import BucketStorage from "../util/bucket";
import { User } from "@prisma/client";
import { database } from "..";
import { resolveData } from "../util/helpers";
import StorageBucket from "../util/bucket";
import { UploadedFile } from "express-fileupload";

const AVATAR_SYSTEM_PATH = resolveData('public/avatar/');
const AVATAR_PUBLIC_PATH = '/data/avatar/';

export default class AvatarStorage extends StorageBucket {

	public constructor() {
		super(AVATAR_PUBLIC_PATH, AVATAR_SYSTEM_PATH);
	}

	public async storeAvatar(file: UploadedFile, user: User) {
		const path = await super.store(file, user.avatar);

		// set as avatar in the database
		await database.user.update({
			where: {
				id: user.id
			},
			data: {
				avatar: path
			}
		});
	}

}