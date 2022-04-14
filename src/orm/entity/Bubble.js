import { EntitySchema } from "typeorm";
import { Bubble } from "../model/Bubble.js";

export default new EntitySchema({
	name: "Bubble",
	target: Bubble,
	columns: {
		id: {
			primary: true,
			type: "int",
			generated: true,
		},
		name: {
			type: "varchar",
		},
		description: {
			type: "varchar",
		},
	},
});
