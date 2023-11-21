import { Grid } from "semantic-ui-react";
import { v4 as uuidv4 } from 'uuid';

import { Activity } from "../../../models/activity";
import { initiallActivity } from '../../../libs/activity/constants';
import ActivityList from "./ActivityList";
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { agent } from '../../../libs/activity/functions';
import { useLoading } from "../../../hooks/useLoading";

interface Props {
    activities: Activity[];
    activity: Activity;
    openForm: boolean;
    setOpenForm: (status: boolean) => void;
    setActivity: (activity: Activity) => void;
    updateList: () => void;
}

const ActivityDashboard = ({ activities, openForm, setOpenForm, activity, setActivity, updateList }: Props) => {
    const { loading, setLoading } = useLoading(false);
    const setCurrentActivity = async (id: string) => {
        const data = await agent.activities.details(id);
        setActivity(data);
        setOpenForm(false);
    }

    const handleCancelActivity = () => {
        setActivity(initiallActivity);
        setOpenForm(false);
    }

    const handleActivityForm = async (activity: Activity) => {
        setLoading(true);

        if (activity.id) {
            await agent.activities.update(activity);
        } else {
            await agent.activities.create({...activity, id: uuidv4()});
        }
        handleCancelActivity();
        setLoading(false);
        updateList();
    }

    const handleDeleteActivity = async (id: string) => {
        setLoading(true);
        if (activity.id === id) handleCancelActivity();
        await agent.activities.remove(id);
        setLoading(false);
        updateList();
    }

    
    return ( 
        <Grid>
            <Grid.Column width={10}>
                <ActivityList 
                    activities={activities} 
                    setCurrentActivity={setCurrentActivity} 
                    deleteActivity={handleDeleteActivity}
                    loading={loading}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {!openForm && activity?.id ? 
                <ActivityDetails 
                    activity={activity} 
                    cancelActivity={handleCancelActivity} 
                    openForm={() => setOpenForm(true)} 
                /> : null}
                {openForm ? 
                    <ActivityForm 
                        activity={activity} 
                        cancelForm={() => setOpenForm(false)}
                        handleActivityForm={handleActivityForm}
                        loading={loading}
                    /> 
                : null}
            </Grid.Column>
        </Grid> 
    );
}
 
export default ActivityDashboard;