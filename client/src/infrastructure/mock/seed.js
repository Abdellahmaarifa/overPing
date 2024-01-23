"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var RegisterDocument = "\n  mutation Register($profilePhoto: Upload!, $userName: String!, $password: String!, $email: String!) {\n    signUp(userCreationInput: { username: $userName, email: $email, password: $password }, profileImage: $profilePhoto  ) {\n      username\n      id\n    }\n  }\n";
var graphqlEndpoint = "http://localhost:5500/graphql";
var _loop_1 = function (id) {
    var img = faker_1.faker.image.urlPicsumPhotos();
    fetch("".concat(img))
        .then(function (res) { return res.blob(); })
        .then(function (myBlob) {
        var myFile = new File([myBlob], "image.jpeg", { type: myBlob.type });
        var formData = new FormData();
        formData.append("operations", JSON.stringify({
            query: RegisterDocument,
            variables: {
                profilePhoto: null,
                userName: "testuser".concat(id),
                password: "123456789",
                email: "test@test.com",
            },
        }));
        formData.append("map", JSON.stringify({
            "0": ["variables.profilePhoto"],
        }));
        formData.append("0", myFile);
        fetch(graphqlEndpoint, {
            method: "POST",
            headers: {
                // Add any necessary headers here
                "x-apollo-operation-name": "something",
                // Other headers as needed
            },
            body: formData,
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log("[".concat(JSON.stringify(data), ", pass: 123456789] created."));
        })
            .catch(function (error) { return console.error(error); });
    })
        .catch(function (error) { return console.error(error); });
};
for (var id = 10; id < 110; id++) {
    _loop_1(id);
}
