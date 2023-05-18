'use client';
import ProjectFormName from './ProjectFormName';
import ProjectFormSettings from './ProjectFormSettings';
import ProjectFormDescription from './ProjectFormDescription';
import DropdownSection from './DropdownSection';
import { ThemeProvider, createTheme } from '@mui/material';
import ProjectFormGenerate from './ProjectFormGenerateBtn';
import { FormEvent, useState } from 'react';
import ProjectFormAmount from './ProjectFormAmount';
import CompletionDisplay from '../CompletionDisplay';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ProjectForm = () => {
  const [comments, setComments] = useState<string>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formObject = Object.fromEntries(formData.entries());
    const response = await fetch('/api/completion', {
      method: 'POST',
      body: JSON.stringify(formObject),
    });
    if (response.ok) {
      const commentsData = await response.json();
      setComments(commentsData);
    }
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <form onSubmit={handleSubmit}>
        <ProjectFormName />
        <DropdownSection label="Description" open={false}>
          <ProjectFormDescription />
        </DropdownSection>
        <DropdownSection label="Settings" open={true}>
          <ProjectFormSettings />
        </DropdownSection>
        <ProjectFormAmount />
        <ProjectFormGenerate />
      </form>
      {comments && <CompletionDisplay completionData={comments} />}
    </ThemeProvider>
  );
};

export default ProjectForm;
