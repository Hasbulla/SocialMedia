import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
   Activity: Activity;
   handleCancelSelectedActivity: () => void;
   handleFormOpen: (id: string) => void;
}

export default function ActivityDetails({ Activity, handleCancelSelectedActivity, handleFormOpen }: Props) {
   return (
      <>
         <Card fluid>
            <Image src={`/assets/categoryImages/${Activity.category}.jpg`} />
            <Card.Content>
               <Card.Header>{Activity.title}</Card.Header>
               <Card.Meta>
                  <span>{Activity.date}</span>
               </Card.Meta>
               <Card.Description>{Activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
               <Button.Group widths="2">
                  <Button onClick={() => handleFormOpen(Activity.id)} basic color="blue" content="Edit" />
                  <Button onClick={handleCancelSelectedActivity} basic color="grey" content="Cancel" />
               </Button.Group>
            </Card.Content>
         </Card>
      </>
   );
}
