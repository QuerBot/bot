import { EntitySchema } from "typeorm";
import { User } from "../model/User.js";

export default new EntitySchema({
	name: "User",
	target: User,
	columns: {
		id: {
			primary: true,
			type: "int",
		},
		handle: {
			type: "varchar",
		},
		lastCheck: {
			type: "datetime",
			generated: true,
		},
		rating: {
			type: "int",
		},
	},
});
