const textService= require(`../text-service`);
const { v4: uuidv4 } = require(`uuid`);


class PostModel {
     createPost(post) {
        return new Promise((resolve, reject) => {
            post.id = uuidv4();
          
            const dbDataText = textService.readDataFromDb(`db.json`);
            console.log(dbDataText)
            const dbData = JSON.parse(dbDataText);
            dbData.posts.push(post);
            const dbDataStringified = JSON.stringify(dbData);

            textService.writeDataToDb(`db.json`, dbDataStringified);
            console.log(post);
            resolve({
                message: `Post successfully added!`
            })

            reject({
                message: `I don't know why it is rejected!!!`
            })

        })
    }

    getAllPosts() {
        return new Promise((resolve, reject) => {
            const dbData = textService.readDataFromDb(`db.json`)
            const parsedDbData = JSON.parse(dbData);
            resolve(parsedDbData);
        });
    }
}

module.exports = PostModel;