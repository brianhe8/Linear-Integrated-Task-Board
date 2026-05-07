import { linearGraphQL } from "../external/linear.js";

interface Issue {
  id: string;
  state: { name: string };
  title: string;
}

const PROJECT_ID = "260b1e3a-7c75-4ec2-bd04-a6351f0f98e5";

async function getAllIssuesFromProject(): Promise<Issue[]> {
  const query = `
      query GetProjectIssues($projectId: String!) {
        project(id: $projectId) {
          issues {
            nodes {
              id
              title
              state { name }
            }
          }
        }
      }
    `;
  const data = await linearGraphQL<{ project: { issues: { nodes: Issue[] } } }>(
    query,
    { projectId: PROJECT_ID },
  );
  return data.project.issues.nodes;
}

export { getAllIssuesFromProject };
