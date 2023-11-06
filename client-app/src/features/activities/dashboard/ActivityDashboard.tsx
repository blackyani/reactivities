import { Grid } from "semantic-ui-react";
import { v4 as uuidv4 } from 'uuid';

import { Activity } from "../../../models/activity";
import { initiallActivity } from '../../../libs/activity/constants';
import ActivityList from "./ActivityList";
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { deleteActivity, getActivityById, postActivity, putActivityById } from '../../../libs/activity/functions';

interface Props {
    activities: Activity[];
    activity: Activity;
    openForm: boolean;
    setOpenForm: (status: boolean) => void;
    setActivity: (activity: Activity) => void;
    updateList: () => void;
}

const ActivityDashboard = ({ activities, openForm, setOpenForm, activity, setActivity, updateList }: Props) => {
    const setCurrentActivity = async (id: string) => {
        const data = await getActivityById(id);
        setActivity(data);
        setOpenForm(false);
    }

    const handleCancelActivity = () => {
        setActivity(initiallActivity);
        setOpenForm(false);
    }

    const handleActivityForm = async (activity: Activity) => {
        handleCancelActivity()

        if (activity.id) {
            await putActivityById(activity);
        } else {
            await postActivity({...activity, id: uuidv4()});
        }

        updateList();
    }

    const handleDeleteActivity = async (id: string) => {
        if (activity.id === id) handleCancelActivity();
        await deleteActivity(id);
        updateList();
    }

    
    return ( 
        <Grid>
            <Grid.Column width={10}>
                <ActivityList 
                    activities={activities} 
                    setCurrentActivity={setCurrentActivity} 
                    deleteActivity={handleDeleteActivity}
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
                    /> 
                : null}
            </Grid.Column>
        </Grid> 
    );
}
 
export default ActivityDashboard;