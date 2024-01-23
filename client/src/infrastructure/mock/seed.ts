import {File} from '@web-std/file';
import { faker } from "@faker-js/faker";

const RegisterDocument = `
  mutation Register($profilePhoto: Upload!, $userName: String!, $password: String!, $email: String!) {
    signUp(userCreationInput: { username: $userName, email: $email, password: $password }, profileImage: $profilePhoto  ) {
      username
      id
    }
  }
`;

const graphqlEndpoint = "http://localhost:5500/graphql";

for (let id = 10; id < 110; id++) {
  const img = faker.image.urlPicsumPhotos();
  fetch(`${img}`)
    .then((res) => res.blob())
    .then((myBlob) => {
      const myFile = new File([myBlob], "image.jpeg", { type: myBlob.type });
      const formData = new FormData();
      formData.append(
        "operations",
        JSON.stringify({
          query: RegisterDocument,
          variables: {
            profilePhoto: null,
            userName: `testuser${id}`,
            password: `123456789`,
            email: `test@test.com`,
          },
        })
      );
      formData.append(
        "map",
        JSON.stringify({
          "0": ["variables.profilePhoto"],
        })
      );
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
        .then((response) => response.json())
        .then((data) => {
          console.log(`[${JSON.stringify(data)}, pass: 123456789] created.`);
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}
