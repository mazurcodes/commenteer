'use client';
import ProjectFormName from './ProjectFormName';
import ProjectFormSettings from './ProjectFormSettings';
import ProjectFormDescription from './ProjectFormDescription';
import DropdownSection from './DropdownSection';

const ProjectForm = () => {
  return (
    <form>
      <ProjectFormName />
      <DropdownSection label="Description" open={false}>
        <ProjectFormDescription />
      </DropdownSection>
      <DropdownSection title="Settings" label="settings" open={true}>
        <ProjectFormSettings />
      </DropdownSection>
    </form>
  );
};

export default ProjectForm;
