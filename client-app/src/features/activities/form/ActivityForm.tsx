import { ChangeEvent, useEffect, useState } from "react";

import { Segment, Form, Button } from "semantic-ui-react";
import { Activity } from "../../../models/activity";

interface Props {
    activity: Activity;
    cancelForm: () => void;
    handleActivityForm: (activity: Activity) => void;
    loading: boolean;
}

const ActivityForm = ({ activity: selectedActivity, cancelForm, handleActivityForm, loading }: Props) => {
    
    const [activity, setActivity] = useState<Activity>(selectedActivity);

    useEffect(() => {
        setActivity(selectedActivity);
    }, [selectedActivity]);

    const handleSubmit = () => {
        handleActivityForm(activity);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setActivity({...activity, [name]: value})
    }
   
    return ( 
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder="Title" value={activity?.title} name="title" onChange={handleInputChange} />
                <Form.TextArea placeholder="Description" value={activity?.description} name="description" onChange={handleInputChange} />
                <Form.Input placeholder="Category" value={activity?.category} name="category" onChange={handleInputChange} />
                <Form.Input placeholder="Date" type="date" value={activity?.date} name="date" onChange={handleInputChange} />
                <Form.Input placeholder="City" value={activity?.city} name="city" onChange={handleInputChange} />
                <Form.Input placeholder="Venue" value={activity?.venue} name="venue" onChange={handleInputChange} />
                <Button floated="right" loading={loading} positive type='submit' content="Submit" />
                <Button floated="right" type='submit' content="Cancel" onClick={cancelForm} />
            </Form>
        </Segment>
    );
}
 
export default ActivityForm;