'use client';
import ProjectFormName from './ProjectFormName';
import ProjectFormSettings from './ProjectFormSettings';
import ProjectFormDescription from './ProjectFormDescription';
import DropdownSection from './DropdownSection';
import { ThemeProvider, createTheme } from '@mui/material';
import ProjectFormGenerate from './ProjectFormGenerateBtn';

const ProjectForm = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <form>
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
