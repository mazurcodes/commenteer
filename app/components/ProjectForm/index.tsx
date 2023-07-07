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
import { auth } from '@/firebase/clientApp';
import { JobData } from '@/types';
import { deductFromBalance } from '@/firebase/crudUtils';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ProjectForm = () => {
  const [isWorking, setWorking] = useState(false);
  const [jobId, setJobId] = useState<string>();
  const [balanceOk, setBalanceOk] = useState(true);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formObject = Object.fromEntries(formData.entries());
    const jobData = {
      ...formObject,
      ownerId: auth.currentUser?.uid,
    } as JobData;
    setWorking(true);
    const response = await fetch('/api/job', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
    if (response.ok) {
      await deductFromBalance(jobData);
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
        <ProjectFormAmount setBalanceOk={setBalanceOk} />
        <ProjectFormGenerate
          working={isWorking}
          jobId={jobId}
          disabled={!balanceOk}
        />
      </form>
    </ThemeProvider>
  );
};

export default ProjectForm;
