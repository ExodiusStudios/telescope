import { ApiError } from "../../util/errors";
import AvatarStorage from "../../storage/avatar";
import { Controller } from "../controller";
import { UploadedFile } from "express-fileupload";

export class UploadAvatarController extends Controller {

	public authorize() {
		return true;
	}

	public async handle() {
		if(!this.req.files || !this.req.files.file) {
			return new ApiError('invalid-request', 'Invalid avatar');
		}

		const storage = new AvatarStorage();
		const avatar = this.req.files.file as UploadedFile;

		await storage.storeAvatar(avatar, this.user);

		// return the public path of their new avatar;
		return this.user.avatar;
	}

}