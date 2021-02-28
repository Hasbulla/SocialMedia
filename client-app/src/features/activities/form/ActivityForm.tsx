import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
   handleFormClose: () => void;
   Activity: Activity | undefined;
   handleCreateOrDeleteActivity: (activity: Activity) => void;
   Submitting: boolean;
}

export default function ActivityForm({ handleFormClose, Activity, handleCreateOrDeleteActivity, Submitting }: Props) {
   const Initial_State = Activity ?? {
      id: '',
      title: '',
      category: '',
      description: '',
      date: '',
      city: '',
      venue: ''
   };

   const [activity, setActivity] = useState(Initial_State);

   function handleSubmit() {
      handleCreateOrDeleteActivity(activity);
   }

   function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      const { name, value } = event.target;
      setActivity({ ...activity, [name]: value });
   }

   return (
      <Segment clearing>
         <Form onSubmit={handleSubmit} autocomplete="off">
            <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
            <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange} />
            <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
            <Form.Input placeholder="Date" type="date" value={activity.date} name="date" onChange={handleInputChange} />
            <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange} />
            <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange} />

            <Button loading={Submitting} floated="right" positive type="submit" content="Submit" />
            <Button onClick={handleFormClose} floated="right" type="button" content="Cancel" />
         </Form>
      </Segment>
   );
}
