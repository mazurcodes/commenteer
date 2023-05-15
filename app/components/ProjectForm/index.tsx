'use client';
import ProjectFormName from './ProjectFormName';
import ProjectFormSettings from './ProjectFormSettings';
import ProjectFormDescription from './ProjectFormDescription';
import DropdownSection from './DropdownSection';
import { ThemeProvider, createTheme } from '@mui/material';
import ProjectFormGenerate from './ProjectFormGenerateBtn';
import { FormEvent } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ProjectForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject);
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
        <ProjectFormGenerate />
      </form>
    </ThemeProvider>
  );
};

export default ProjectForm;
