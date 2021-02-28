import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
   Activities: Activity[];
   handleSelectedActivity: (id: string) => void;
   handleDeleteActivity: (id: string) => void;
   Submitting: boolean;
}

export default function ActivityList({ Activities, handleSelectedActivity, handleDeleteActivity, Submitting }: Props) {
   const [Target, setTarget] = useState('');

   function handleDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
      setTarget(event.currentTarget.name);
      handleDeleteActivity(id);
   }

   return (
      <Segment>
         <Item.Group divided>
            {Activities.map((activity) => (
               <Item key={activity.id}>
                  <Item.Content>
                     <Item.Header as="a">{activity.title}</Item.Header>
                     <Item.Meta>{activity.date}</Item.Meta>
                     <Item.Description>
                        <div>{activity.description}</div>
                        <div>
                           {activity.city}, {activity.venue}
                        </div>
                     </Item.Description>
                     <Item.Extra>
                        <Button onClick={() => handleSelectedActivity(activity.id)} floated="right" content="View" color="blue" />
                        <Button
                           name={activity.id}
                           loading={Submitting && Target === activity.id}
                           onClick={(event) => handleDelete(event, activity.id)}
                           floated="right"
                           content="Delete"
                           color="red"
                        />
                        <Label basic content={activity.category} />
                     </Item.Extra>
                  </Item.Content>
               </Item>
            ))}
         </Item.Group>
      </Segment>
   );
}
