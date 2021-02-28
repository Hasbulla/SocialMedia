import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
   const [Activities, setActivities] = useState<Activity[]>([]);
   const [SelectedActivities, setSelectedActivities] = useState<Activity | undefined>(undefined);
   const [EditMode, setEditMode] = useState(false);
   const [Loading, setLoading] = useState(true);
   const [Submitting, setSubmitting] = useState(false);

   useEffect(() => {
      agent.Activities.list().then((response) => {
         let activitis: Activity[] = [];
         response.forEach((activity) => {
            activity.date = activity.date.split('T')[0];
            activitis.push(activity);
         });
         setActivities(activitis);
         setLoading(false);
      });
   }, []);

   function handleSelectedActivity(id: string) {
      setSelectedActivities(Activities.find((x) => x.id === id));
   }

   function handleCancelSelectedActivity() {
      setSelectedActivities(undefined);
   }

   function handleFormOpen(id?: string) {
      id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
      setEditMode(true);
   }

   function handleFormClose() {
      setEditMode(false);
   }

   function handleCreateOrDeleteActivity(activity: Activity) {
      setSubmitting(true);
      if (activity.id) {
         agent.Activities.update(activity).then(() => {
            setActivities([...Activities.filter((x) => x.id !== activity.id), activity]);
            setSelectedActivities(activity);
            setEditMode(false);
            setSubmitting(false);
         });
      } else {
         activity.id = uuid();
         agent.Activities.create(activity).then(() => {
            setActivities([...Activities, activity]);
            setSelectedActivities(activity);
            setEditMode(false);
            setSubmitting(false);
         });
      }
   }

   function handleDeleteActivity(id: string) {
      setSubmitting(true);
      agent.Activities.delete(id).then(() => {
         setActivities([...Activities.filter((x) => x.id !== id)]);
         setSubmitting(false);
      });
   }

   if (Loading) return <LoadingComponent content="Loading...." />;
   return (
      <>
         <NavBar handleFormOpen={handleFormOpen} />
         <Container style={{ marginTop: '7em' }}>
            <ActivityDashboard
               Activities={Activities}
               SelectedActivity={SelectedActivities}
               handleSelectedActivity={handleSelectedActivity}
               handleCancelSelectedActivity={handleCancelSelectedActivity}
               EditMode={EditMode}
               handleFormOpen={handleFormOpen}
               handleFormClose={handleFormClose}
               handleCreateOrDeleteActivity={handleCreateOrDeleteActivity}
               handleDeleteActivity={handleDeleteActivity}
               Submitting={Submitting}
            />
         </Container>
      </>
   );
}

export default App;
