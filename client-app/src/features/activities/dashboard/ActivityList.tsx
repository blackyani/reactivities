import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";

import { Activity } from "../../../models/activity";
import { SyntheticEventData } from "react-dom/test-utils";

interface Props {
    activities: Activity[];
    setCurrentActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    loading: boolean;
}

const ActivityList = ({ activities, setCurrentActivity, deleteActivity, loading }: Props) => {
    const [currentActivity, setActivity] = useState('');

    const handleCurrentDelete = (id: string) => {
        setActivity(id);
        deleteActivity(id)
    }


    const mapActivities = ({title, id, date, description, city, venue, category}: Activity) => (
        <Item key={id}>
          <Item.Content>
              <Item.Header as="a">{title}</Item.Header>
              <Item.Meta>{date}</Item.Meta>
              <Item.Description>
                  <div>{description}</div>
                  <div>{city}</div>
                  <div>{venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button floated="right" color="blue" content="View" onClick={() => setCurrentActivity(id)}></Button>
                <Button floated="right" loading={loading && id === currentActivity} name={id} color="red" content="Delete" onClick={() => handleCurrentDelete(id)}></Button>
                <Label basic content={category} />
              </Item.Extra>
          </Item.Content>
        </Item>
      )
    
    return ( 
        <Segment>
            <Item.Group>
                 {activities && activities.map(mapActivities)}
            </Item.Group>
        </Segment> 
    );
}
 
export default ActivityList;