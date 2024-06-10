"use client"
import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface Issue {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [id, setId] = useState<number>();
  const [updateId, setUpdateId] = useState<number>();
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    fetchIssues();
  }, []);

  // Fetching all issues
  async function fetchIssues(){
    try {
      const response = await axios.get('/issues');
      setIssues(response.data);
      setId(response.data.length+1)
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  // Creating new issue
  async function createIssue(){
    try {
      const newIssue: Issue = { id, title, description };
      await axios.post('/issues', newIssue);
      fetchIssues();
      // Clear input fields
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

    // Updating issue base on issue Id
  async function updateIssue(){
    try {
      const updatedIssue: Issue = { id:updateId, title, description };
      await axios.put('/issues', updatedIssue);
      fetchIssues();
      setIsEditing((edit)=>!edit)
      // Clear input fields
      setUpdateId(0);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  // Deleting issue based on ID
  async function deleteIssue(id: number){
    try {
      await axios.delete(`/issues?id=${id}`);
      fetchIssues();
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  function handleTitle(event){
    setTitle(event.target.value)
  }

  function handleDescription(event){
    setDescription(event.target.value)
  }

  function handleUpdateId(event){
    setUpdateId(Number(event.target.value))
  }

  function handleIsEditing(){
    setIsEditing((edit)=>!edit)
  }

  return (
    <div className="flex flex-col items-center justify-between h-80 max-h-80 m-48 p-2">
      <div className='w-full max-w-xs bg-amber-400 shadow-md rounded px-8 pt-6 pb-8'>
        {isEditing && <Input label="ID" placeholder="ID" value={updateId} handle={handleUpdateId}/>}
        <Input label="Title" placeholder="Title" value={title} handle={handleTitle}/>
        <Input label="Description" placeholder="Description" value={description} handle={handleDescription}/>  
        {
          isEditing ?  <Button handle={updateIssue} name='Update'/> :
            <>
              <Button handle={createIssue} name='Create'/>
              <Button handle={handleIsEditing} name='Edit'/>
            </>
        }
      </div>
      <div className='w-full max-w-screen-md min-h-fit bg-amber-400 shadow-md rounded px-8 pt-6 mt-12'>
        <h2 className='underline decoration-solid font-bold'>Current Issues</h2>
        <ul>
          {issues.map(issue => (
            <li key={issue.id}>
            { `Id: ${issue.id}: ${issue.title} - ${issue.description}`}
              <button className='m-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-1 px-1 rounded' onClick={() => deleteIssue(issue.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>   
    </div>
  );
}
