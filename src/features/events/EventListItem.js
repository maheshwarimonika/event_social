import React from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import EventListAttendee from './EventListAttendee';
import { useDispatch } from 'react-redux';
import { deleteEvent } from './eventActions';
import { format } from 'date-fns';

export default function EventListItem({event}) {
  const dispatch = useDispatch();
  return (
    <Segment.Group>
      <Segment className='event-title'>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description className='hostedBy'>
                Hosted By {event.hostedBy}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' color='grey'/> {format(event.date, 'MMMM d, yyyy h:mm a')}
          <Icon name='marker' color='grey'/> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee}/>
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button
          onClick={() => dispatch(deleteEvent(event.id))}
          color='red'
          floated='right'
          content='Delete'
         />
        <Button
          as={Link}
          to={`events/${event.id}`}
          className='view'
          floated='right'
          content='View'
         />
      </Segment>
    </Segment.Group>
  )
}
