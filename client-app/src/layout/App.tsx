import { useState, useEffect } from 'react';

import { Container } from 'semantic-ui-react';

import NavBar from '../components/NavBar';
import { Activity } from '../models/activity';
import { initiallActivity } from '../libs/activity/constants';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import { getActivities } from '../libs/activity/functions';

function App() {
  const [data, setData] = useState<Activity[]>([]);
  const [activity, setActivity] = useState<Activity>(initiallActivity);
  const [openForm, setOpenForm] = useState(false);

  const fetchActivities = async () => {
    const data =  await getActivities();
    setData(data);
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleCreate = () => {
    setActivity(initiallActivity);
    setOpenForm(true);
  }

  return (
    <>
      <NavBar create={handleCreate} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard 
          activities={data} 
          openForm={openForm} 
          setOpenForm={setOpenForm} 
          activity={activity} 
          setActivity={setActivity}
          updateList={fetchActivities}
        />
      </Container>
      
    </>
  )
}

export default App
