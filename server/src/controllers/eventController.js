import Event from '../models/Event.js';
import Task from '../models/Task.js';
import User from '../models/User.js';

class EventController {
  async getAll(req, res) {
    try {
      const userFromToken = req.user;
      const user = await User.findById(userFromToken._id);
      if (!user) {
        return res.status(500).json({ error: 'User from token not found' });
      }
      const events = await Event.find({ author: user._id }, { tasks: 0 });
      return res.status(200).json(events);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'failed take all events' });
    }
  }

  async create(req, res) {
    try {
      const body = req.body;
      const userFromToken = req.user;
      const user = await User.findById(userFromToken._id);
      if (!user) {
        return res.status(500).json({ error: 'User from token not found' });
      }
      if (!(body.title && body.eventDate && body.text)) {
        return res.status(400).json({ error: 'Title, text or event date not provided' });
      }
      if (
        !!body.eventType &&
        body.eventType !== 'minor' &&
        body.eventType !== 'warning' &&
        body.eventType !== 'important'
      ) {
        return res.status(400).json({ error: 'Incorrect event type' });
      }
      const eventToAdd = {
        ...body,
        author: user._id,
      };
      const event = await Event.create(eventToAdd);
      const resEvent = await Event.findById(event._id, { tasks: 0 });
      await User.findByIdAndUpdate(user._id, { ...user, events: user.events.push(event._id) });
      return res.status(200).json(resEvent);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'failed create event' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const body = req.body;
    if (!id) {
      res.status(400).json({ error: 'Id missed' });
    }
    if (!(body.title && body.eventDate && body.text)) {
      return res.status(400).json({ error: 'Title, text or event date not provided' });
    }
    if (
      !!body.eventType &&
      body.eventType !== 'minor' &&
      body.eventType !== 'warning' &&
      body.eventType !== 'important'
    ) {
      return res.status(400).json({ error: 'Incorrect event type' });
    }
    const updatedEvent = await Event.findByIdAndUpdate(id, body, { new: true });
    const event = await Event.findById(updatedEvent._id, { tasks: 0 });
    return res.status(200).json(event);
  }
  catch(error) {
    console.log(error);
    return res.status(500).json({ error: 'Update event error' });
  }

  async delete(req, res) {
    const eventId = req.params.id;
    const userFromToken = req.user;
    const user = await User.findById(userFromToken._id);
    if (!user) {
      return res.status(500).json({ error: 'User from token not found' });
    }
    if (!eventId) return res.status(400).json({ error: 'Event id not provided' });

    user.events = user.events.filter((e) => e._id.toString() !== eventId);
    await user.save();
    await Event.findByIdAndRemove(eventId);
    await Task.deleteMany({ event: eventId });
    return res.status(200).json(null);
  }
  catch(error) {
    console.log(error);
    return res.status(400).json({ error: 'failed create event' });
  }

  async getBy(req, res) {
    try {
      const userFromToken = req.user;
      const user = await User.findById(userFromToken._id);
      if (!user) {
        return res.status(500).json({ error: 'User from token not found' });
      }
      let events = await Event.find({ author: user._id }, { tasks: 0 });
      const eventType = req.query.type;
      const date = req.query.date;
      const queryString = req.query.queryString;
      if (queryString) {
        const regexQuery = {
          author: user._id,
          title: new RegExp(req.query.queryString, 'i'),
        };
        events = await Event.find(regexQuery, { tasks: 0 });
      }
      if (eventType === 'minor' || eventType === 'warning' || eventType === 'important') {
        events = events.filter((event) => event.eventType === eventType);
      }
      if (date === 'earliest') {
        events = events.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
      } else if (date === 'newest') {
        events = events.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
      }
      return res.status(200).json(events);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'failed take events' });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const userFromToken = req.user;
      const user = await User.findById(userFromToken._id);
      if (!user) {
        return res.status(500).json({ error: 'User from token not found' });
      }
      if (!id) {
        res.status(400).json({ error: 'Id not provided' });
      }
      const event = await Event.find({ _id: id, author: user._id }).populate('tasks');
      return res.status(200).send(event);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'failed take event' });
    }
  }
}

export default new EventController();
