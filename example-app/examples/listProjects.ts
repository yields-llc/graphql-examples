import {listProjects} from "@app/graphql-client";

async function main() {
  const projects = await listProjects()
  console.log(projects)
}

await main()
