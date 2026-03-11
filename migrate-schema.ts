import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const AUTH_TOKEN = process.env.AUTH_TOKEN;
const ENDPOINT = 'https://management-ap-south-1.hygraph.com/graphql/environments/master/cmmbmueih01ra07vv997kz5rx';

async function run() {
    const query = `
    mutation {
      createRole: createSimpleField(data: {apiId: "role", displayName: "Role", type: STRING, isList: true, parentApiId: "Project"}) { apiId }
      createPodTeam: createSimpleField(data: {apiId: "podTeam", displayName: "Pod Team", type: STRING, isList: true, parentApiId: "Project"}) { apiId }
      createSolutions: createSimpleField(data: {apiId: "solutions", displayName: "Solutions", type: STRING, parentApiId: "Project"}) { apiId }
      createResults: createSimpleField(data: {apiId: "results", displayName: "Results", type: STRING, parentApiId: "Project"}) { apiId }
      createAssets: createRelationalField(data: {
        apiId: "assets",
        displayName: "Assets",
        isList: true,
        parentApiId: "Project",
        type: RELATION,
        reverseField: {
          modelApiId: "Asset",
          apiId: "project",
          displayName: "Project",
          isList: false
        }
      }) { apiId }
    }
  `;

    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
        },
        body: JSON.stringify({ query })
    });

    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
}

run();
