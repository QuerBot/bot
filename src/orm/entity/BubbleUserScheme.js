import { EntitySchema } from "typeorm";
import { BubbleUser } from "../model/Bubbleuser.js";
import { Bubble } from "../model/Bubble.js";
import { User } from "../model/User.js";

export default new EntitySchema({
	name: "BubbleUser",
	target: BubbleUser,
	relations: {
		bubbleId: {
			target: Bubble,
			type: "many-to-many",
			joinTable: true,
			cascade: true,
		},
		userId: {
			target: User,
			type: "many-to-many",
			joinTable: true,
			cascada: true,
		},
	},
});
