import { NextApiRequest, NextApiResponse } from 'next';
import { NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER } from 'next/dist/lib/constants';
import { NextResponse } from 'next/server'

interface Issue {
  id: number;
  title: string;
  description: string;
}

let issues: Issue[] = [
  { id: 1, title: 'Issue 1', description: 'This is the first issue' },
  { id: 2, title: 'Issue 2', description: 'This is the second issue' },
];

// export function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { method } = req;

//   switch (method) {
//     case 'GET':
//       res.status(200).json(issues);
//       break;
//     case 'POST':
//       const newIssue: Issue = req.body;
//       issues.push(newIssue);
//       console.log('Created:', newIssue);
//       res.status(201).json(newIssue);
//       break;
//     case 'PUT':
//       const updatedIssue: Issue = req.body;
//       issues = issues.map(issue => (issue.id === updatedIssue.id ? updatedIssue : issue));
//       console.log('Updated:', updatedIssue);
//       res.status(200).json(updatedIssue);
//       break;
//     case 'DELETE':
//       const { id } = req.query;
//       issues = issues.filter(issue => issue.id !== parseInt(id as string));
//       console.log('Deleted:', id);
//       res.status(204).end();
//       break;
//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }

export async function GET(req: NextApiRequest, res: NextApiResponse){
    console.log(issues)
    //res.status(200).json(issues);
    return NextResponse.json(issues, { status: 200 })
}

export async function POST(req: NextApiRequest){
    const newIssue: Issue = await req.json();
    issues.push(newIssue);
    console.log(issues)
    return NextResponse.json(issues, { status: 201 })
}
export async function PUT(req: NextApiRequest){
    const updatedIssue: Issue = await req.json();
    issues = issues.map(issue => (issue.id === updatedIssue.id ? updatedIssue : issue));
    console.log('Updated:', updatedIssue);

    return NextResponse.json(issues, {status:200})
}
export async function DELETE(req: NextApiRequest){
    const { id } = req.query;
    issues = issues.filter(issue => issue.id !== parseInt(id as string));
    console.log('Deleted:', id);

    return NextResponse.json({status:204})
}