const textService = require(`../text-service`);
const { v4: uuidv4 } = require("uuid");

const { resolve } = require("path");
const { text } = require("express");

class PostModel {
    createPost(post) {
        return new Promise((resolve, reject) => {

            post.id = uuidv4();
            const dbDataText = textService.readDataFromDb(`db.json`);
            const dbData = JSON.parse(dbDataText);
            dbData.posts.push(post);
            const dbDataStringified = JSON.stringify(dbData);

            textService.writeDataToDb(`db.json`, dbDataStringified);

            resolve({ message: `Post successfully added!` })

            reject({ message: `Rejected!` })

        })
    }

    getAllPosts() {
        return new Promise((resolve, reject) => {
            const dbData = textService.readDataFromDb(`db.json`)
            const parsedDbData = JSON.parse(dbData);
            const dbPosts = parsedDbData.posts;
            resolve(dbPosts);
        });
    }

    deletePostById(id) {
        return new Promise((resolve, reject) => {
            const dbData = textService.readDataFromDb(`db.json`);
            const parsedDbData = JSON.parse(dbData);
            const filteredData = parsedDbData.posts.filter(u => u.id !== id);
            parsedDbData.posts = filteredData;
            const dbDataStringified = JSON.stringify(parsedDbData);

            textService.writeDataToDb(`db.json`, dbDataStringified);

            resolve({ message: `Blog post successfully deleted!` });

        })
    }

    updatePostById(id, body) {
        return new Promise((resolve, reject) => {
            const dbData = textService.readDataFromDb(`db.json`);
            const parsedDbData = JSON.parse(dbData);

            parsedDbData.posts.forEach(post => {
                if (post.id === id) {
                    if (body.title) {
                        post.title = body.title;
                    }

                    if (body.author) {
                        post.author = body.author;
                    }

                    if (body.text) {
                        post.text = body.text;
                    }
                }

            });

            textService.writeDataToDb(`db.json`, JSON.stringify(parsedDbData));

            resolve({ message: `Blog post successfully updated!` });
        })
    }
}


module.exports = PostModel;