import { EntitySchema } from "typeorm";
import { User } from "../model/User.js";

export default new EntitySchema({
	name: "User",
	target: User,
	columns: {
		id: {
			primary: true,
			type: "int",
			generated: true,
		},
		handle: {
			type: "varchar",
		},
		lastCheck: {
			type: "datetime",
		},
		rating: {
			type: "int",
		},
	},
});
