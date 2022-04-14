import { EntitySchema } from "typeorm";
import { UserFollow } from "../model/UserFollow.js";
import { User } from "../model/User.js";

export default new EntitySchema({
	name: "UserFollow",
	target: UserFollow,
	relations: {
		userId: {
			target: User,
			type: "many-to-many",
			joinTable: true,
			cascada: true,
		},
		followerId: {
			target: User,
			type: "many-to-many",
			joinTable: true,
			cascada: true,
		},
	},
});
