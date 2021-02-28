import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

function App() {
   const [Activities, setActivities] = useState<Activity[]>([]);
   const [SelectedActivities, setSelectedActivities] = useState<Activity | undefined>(undefined);
   const [EditMode, setEditMode] = useState(false);

   useEffect(() => {
      axios.get<Activity[]>('http://localhost:5000/api/activities').then((response) => {
         setActivities(response.data);
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
      activity.id ? setActivities([...Activities.filter((x) => x.id !== activity.id), activity]) : setActivities([...Activities, { ...activity, id: uuid() }]);
      setEditMode(false);
      setSelectedActivities(activity);
   }

   function handleDeleteActivity(id: string) {
      setActivities([...Activities.filter((x) => x.id !== id)]);
   }

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
            />
         </Container>
      </>
   );
}

export default App;
