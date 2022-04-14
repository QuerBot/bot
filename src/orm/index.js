import typeorm from "typeorm";
import { Bubble } from "./model/Bubble.js";
import { User } from "./model/User.js";
import { UserFollow } from "./model/UserFollow.js";
import { BubbleUser } from "./model/BubbleUser.js";
import "dotenv/config";

typeorm
	.createConnection({
		type: "mysql",
		host: process.env.DB_HOST,
		port: process.env.PORT,
		username: process.env.DB_USR,
		password: process.env.DB_PW,
		database: process.env.DB_NAME,
		synchronize: true,
		logging: false,
		entities: [require("./entity/Bubble"), require("./entity/User"), require("./entity/BubbleUser"), require("./entity/UserFollow")],
	})
	.then(function (connection) {
		const bubble1 = new Bubble(0, "Querdenker", "Querdenker Bubble");
		const bubble2 = new Bubble(0, "AfD", "AfD Bubble");

		return connection.manager.save([bubble1, bubble2]).then(() => {
			let post = new Post();
			post.title = "Control flow based type analysis";
			post.text = "TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.";
			post.categories = [category1, category2];

			let postRepository = connection.getRepository(Post);
			postRepository
				.save(post)
				.then(function (savedPost) {
					console.log("Post has been saved: ", savedPost);
					console.log("Now lets load all posts: ");

					return postRepository.find();
				})
				.then(function (allPosts) {
					console.log("All posts: ", allPosts);
				});
		});
	})
	.catch(function (error) {
		console.log("Error: ", error);
	});
