import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const AUTH_TOKEN = process.env.AUTH_TOKEN;
const ENDPOINT = 'https://management-ap-south-1.hygraph.com/graphql/environments/master/cmmbmueih01ra07vv997kz5rx';

async function run() {
    const query = `
    query {
      viewer {
        project(id: "cmmbmueih01ra07vv997kz5rx") {
          environment(name: "master") {
            models {
              id
              apiId
              displayName
            }
          }
        }
      }
    }
  `;

    const res = await fetch('https://management-ap-south-1.hygraph.com/graphql', {
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
