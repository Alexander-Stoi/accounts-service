const textService = require('../text-service');
const { v4: uuidv4 } = require(`uuid`);

const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);


class User {
    constructor(id, email, password, fullName, gender, role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.gender = gender;
        this.role = role;
    }
}

class UserModel {
    registerUser(body) {

        return new Promise((resolve, reject) => {
            const dbData = textService.readDataFromDb('db.json');
            const parsedDbData = JSON.parse(dbData);
            const users = parsedDbData.users;

            const exists = users.some(u => u.email === body.email);
            if (!exists) {
                const user = new User(
                    uuidv4(),
                    body.email,
                    body.password,
                    body.fullName,
                    body.gender,
                    body.role
                );
                parsedDbData.users.push(user);
                textService.writeDataToDb('db.json', JSON.stringify(parsedDbData));

                const { password, ...cleanUser } = user;
                resolve(cleanUser);
            } else {
                resolve({ message: `User already exist id DB!` });
            }

        })

    }
    loginUser(body) {
        return new Promise(async (resolve, reject) => {
            const dbData = textService.readDataFromDb('db.json');
            const parsedDbData = JSON.parse(dbData);
            const users = parsedDbData.users;
            const user = users.find(u => u.email === body.email);

            const validatePassword = await bcrypt.compare(body.password, user.password);

            if (!validatePassword) {
                return resolve({ message: `Incorrect credentials!` });
            }
            else {
                const { password, ...cleanUser } = user;
                return resolve(user);
            }
        })
    }


}

module.exports = UserModel;