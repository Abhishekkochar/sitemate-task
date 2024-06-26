import { NextApiRequest} from 'next';
import { NextResponse } from 'next/server'

interface Issue {
  id: number;
  title: string;
  description: string;
}

let issues: Issue[] = [
  { id: 1, title: 'Issue 1', description: 'This is the first issue' },
  { id: 2, title: 'Issue 2', description: 'This is the second issue' },
  { id: 3, title: 'Issue 3', description: 'This is the thrid issue' },
];

// This API get all the issues
export async function GET(){
  try{
    console.log(issues)
    return NextResponse.json(issues, { status: 200 })
  } catch(e){
    console.error(e)
  }
}

// This Api will add the new API at issues[length-1]
export async function POST(req: NextApiRequest){
  try{
    const newIssue: Issue = await req.json();
    issues.push(newIssue);
    console.log(issues)
    return NextResponse.json(issues, { status: 201 })
  } catch(e){
    console.error(e)
  }
}

// This API will edit/update the Issue based on the ID
export async function PUT(req: NextApiRequest){
  try{
    const updatedIssue: Issue = await req.json();
    issues = issues.map(issue => (issue.id === updatedIssue.id ? updatedIssue : issue));
    console.log('Updated:', updatedIssue);
    return NextResponse.json(issues, {status:200})
  } catch(e){
    console.error(e)
  }   
}

// This API will delete the Issue based on the ID
export async function DELETE(req: NextApiRequest) {
  try{
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    issues = issues.filter(issue => issue.id !== parseInt(id as string));
    console.log('Deleted:', id);
    console.log(issues)
    return NextResponse.json({status:204})
  } catch(error){
    console.error('Delete Issues - error', error);
  }  
}