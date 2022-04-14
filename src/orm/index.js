import typeorm from "typeorm";
import { Bubble } from "./model/Bubble.js";
import { User } from "./model/User.js";
import { UserFollow } from "./model/UserFollow.js";
import { BubbleUser } from "./model/BubbleUser.js";
import BubbleScheme from "./entity/BubbleScheme.js";
import UserScheme from "./entity/UserScheme.js";
import BubbleUserScheme from "./entity/BubbleUserScheme.js";
import UserFollowScheme from "./entity/UserFollowScheme.js";
import "dotenv/config";

typeorm
	.createConnection({
		type: "mysql",
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USR,
		password: process.env.DB_PW,
		database: process.env.DB_NAME,
		synchronize: true,
		logging: true,
		entities: [BubbleScheme, UserScheme, BubbleUserScheme, UserFollowScheme],
	})
	.then(function (connection) {
		const bubble1 = new Bubble(0, "Querdenker", "Querdenker Bubble");
		const bubble2 = new Bubble(0, "AfD", "AfD Bubble");

		return connection.manager.save([bubble1, bubble2]).then(() => {
			let user = new User();
			user.handle = "QuerBot";
			user.id = 1509856466076946442;
			user.rating = 5;

			let postUser = connection.getRepository(User);
			postUser
				.save(user)
				.then(function (savedUser) {
					console.log("User has been saved: ", savedUser);
					console.log("Now lets load all users: ");

					return postRepository.find();
				})
				.then(function (allUsers) {
					console.log("All Users: ", allUsers);
				});

			let bubbleuser = new BubbleUser();
			bubbleuser.bubbleId = bubble1;
			bubbleuser.userId = user;

			let userfollow = new UserFollow();
			userfollow.followerId = user;
			userfollow.userId = user;
		});
	})
	.catch(function (error) {
		console.log("Error: ", error);
	});
