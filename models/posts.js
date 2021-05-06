const textService= require(`../text-service`);
const { v4: uuidv4 } = require(`uuid`);


class PostModel {
     createPost(post) {
        return new Promise((resolve, rejects) => {
            post.id = uuidv4();

            const data = textService.readData(`../db.json`);
            const parsedData = JSON.parse(data);
            parsedData.posts.push(post);

            textService.writeData(`../db.json`, parsedData);

            resolve({
                message: `Post successfully added!`
            })

        })
    }
}