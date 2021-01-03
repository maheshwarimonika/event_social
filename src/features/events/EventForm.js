import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createEvent, updateEvent } from './eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import MyTextArea from '../../app/common/form/MyTextArea';
import MySelectInput from '../../app/common/form/MySelectInput';
import MyDateInput from '../../app/common/form/MyDateInput';
import { categoryData } from '../../app/api/categoryOptions';

export default function EventForm(props) {
  const selectedEvent = useSelector(state => state.event.events.find(e => e.id === props.match.params.id));
  const dispatch = useDispatch();
  const initialValues = selectedEvent ?? {
    'title': '',
    'category': '',
    'description': '',
    'city': '',
    'venue': '',
    'date': ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required()
  });

  return (
    <Segment clearing color='blue'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          selectedEvent ? dispatch(updateEvent({...props.selectedEvent, ...values})) : dispatch(createEvent(values));
          props.history.push('/events');
        }}
      >
        {({isSubmitting, isValid, dirty}) => (
          <Form className='ui form'>
            <Header className='form-header' sub content='Event Details' />
            <MyTextInput name='title' placeholder='Event title' />
            <MySelectInput name='category' placeholder='Category' options={categoryData}/>
            <MyTextArea name='description' placeholder='Description' rows={3}/>
            <Header className='form-header' sub content='Event Location Details' />
            <MyTextInput name='city' placeholder='City' />
            <MyTextInput name='venue' placeholder='Venue' />
            <MyDateInput
             name='date'
             placeholderText='Event Date'
             timeFormat='HH:mm'
             showTimeSelect
             timeCaption='time'
             dateFormat='MMMM d, yyyy h:mm a'
            />
            <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} type='submit' floated='right' color='blue' content='Submit' />
            <Button disabled={isSubmitting} as={Link} to='/events' type='submit' floated='right' content='Cancel' />
          </Form>
        )}
      </Formik>
    </Segment>
  )
}
