import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {Button, Header, Segment} from "semantic-ui-react";
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import {Formik, Form} from "formik";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import * as Yup from 'yup';
import {categoryOptions} from "../../../app/common/form/options";
import {Activity} from "../../../app/models/activity";

export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {createActivity, updateActivity,
        loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => { if (activity) setActivity(activity) });
    }, [id, loadActivity]);

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required field'),
        category: Yup.string().required('Category is required field'),
        description: Yup.string().required('Description is required field'),
        date: Yup.string().required('Date is required field').nullable(),
        city: Yup.string().required('City is required field'),
        venue: Yup.string().required('Venue is required field')
    })

    function handleFormSubmit(activity: Activity) {
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color="teal" />
            <Formik
                enableReinitialize
                initialValues={activity}
                validationSchema={validationSchema}
                onSubmit={values => handleFormSubmit(values)}
            >
                { ({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <TextInput
                            name="title"
                            placeholder="Title"
                        />
                        <TextArea rows={3} placeholder='Description' name='description' />
                        <SelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <DateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                        <Header content="Location Details" sub color="teal" />
                        <TextInput placeholder='City' name='city' />
                        <TextInput placeholder='Venue' name='venue' />
                        <Button
                            loading={loading}
                            floated='right'
                            positive
                            type='submit'
                            content='Submit'
                            disabled={!isValid || isSubmitting || !dirty}
                        />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                ) }
            </Formik>
        </Segment>
    )
})