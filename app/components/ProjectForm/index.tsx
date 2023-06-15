'use client';
import ProjectFormName from './ProjectFormName';
import ProjectFormSettings from './ProjectFormSettings';
import ProjectFormDescription from './ProjectFormDescription';
import DropdownSection from './DropdownSection';
import { ThemeProvider, createTheme } from '@mui/material';
import ProjectFormGenerate from './ProjectFormGenerateBtn';
import { FormEvent, useState } from 'react';
import ProjectFormAmount from './ProjectFormAmount';
import styles from './index.module.scss';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ProjectForm = () => {
  const [isWorking, setWorking] = useState(false);
  const [jobId, setJobId] = useState<string>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formObject = Object.fromEntries(formData.entries());
    setWorking(true);
    const response = await fetch('/api/job', {
      method: 'POST',
      body: JSON.stringify(formObject),
    });
    if (response.ok) {
      const jobId = await response.json();
      setJobId(jobId);
      setWorking(false);
    }
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <ProjectFormName />
        <div className={styles.descriptionWrapper}>
          <DropdownSection label="Description" open={false}>
            <ProjectFormDescription />
          </DropdownSection>
        </div>
        <div className={styles.settingsWrapper}>
          <DropdownSection label="Settings" open={true}>
            <ProjectFormSettings />
          </DropdownSection>
        </div>
        <ProjectFormAmount />
        <ProjectFormGenerate working={isWorking} jobId={jobId} />
      </form>
    </ThemeProvider>
  );
};

export default ProjectForm;
