import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityLIst';

interface Props {
   Activities: Activity[];
   SelectedActivity: Activity | undefined;
   handleSelectedActivity: (id: string) => void;
   handleCancelSelectedActivity: () => void;
   EditMode: boolean;
   handleFormOpen: (id: string) => void;
   handleFormClose: () => void;
   handleCreateOrDeleteActivity: (activity: Activity) => void;
   handleDeleteActivity: (id: string) => void;
}

export default function ActivityDashboard({
   Activities,
   SelectedActivity,
   handleSelectedActivity,
   handleCancelSelectedActivity,
   EditMode,
   handleFormOpen,
   handleFormClose,
   handleCreateOrDeleteActivity,
   handleDeleteActivity
}: Props) {
   return (
      <Grid>
         <Grid.Column width="10">
            <ActivityList Activities={Activities} handleSelectedActivity={handleSelectedActivity} handleDeleteActivity={handleDeleteActivity} />
         </Grid.Column>
         <Grid.Column width="6">
            {SelectedActivity && !EditMode && (
               <ActivityDetails Activity={SelectedActivity} handleCancelSelectedActivity={handleCancelSelectedActivity} handleFormOpen={handleFormOpen} />
            )}
            {EditMode && <ActivityForm handleFormClose={handleFormClose} Activity={SelectedActivity} handleCreateOrDeleteActivity={handleCreateOrDeleteActivity} />}
         </Grid.Column>
      </Grid>
   );
}
