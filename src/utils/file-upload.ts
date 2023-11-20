import multer from 'multer';
import path from 'path';
import fs from 'fs';

export default class FileUpload {
	uploadDir = "";

	constructor({ fileInstanceName, uploadDir = path.join(process.cwd(), 'public/products') }) {
		if (!fs.existsSync(uploadDir)) {
		  fs.mkdirSync(uploadDir, { recursive: true });
		}

		this.uploadDir = uploadDir;
		this.fileInstanceName = fileInstanceName;
	}

	get storage() {
		return multer.diskStorage({
		  destination: (req, file, cb) => cb(null, this.uploadDir),
		  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
		});
	}
	upload = (req, res, callback) => new Promise((resolve, reject) => {
		if(req.method === "POST") {
			const upload = multer({ storage: this.storage });

			try {
				upload.array(this.fileInstanceName)(req, res, resolve);
			}
			catch(error) {
				reject(error);
			}
		}

		reject({error: {message: "Method not allowed"}})
	})
}