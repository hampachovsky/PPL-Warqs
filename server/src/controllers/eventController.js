import Event from '../models/Event.js';
import User from '../models/User.js';
import Task from '../models/Task.js';

class EventController {
  async getAll(req, res) {
    try {
      const userFromToken = req.user;
      const user = await User.findById(userFromToken._id);
      if (!user) {
        return response.status(500).json({ error: 'User from token not found' });
      }
      const events = await Event.find({ author: user._id });
      //  const events = await Event.find();
      return res.status(200).json(events);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'failde take all events' });
    }
  }

  //TODO: GET BY "TYPE": WARNING...; GET BY "DATE" = "NOW" | "2023" => NOW(THIS YEAR) = DEFAULT
  async getBy(req, res) {
    try {
      const { id } = req.params.id;
      const events = await Event.findById({ _id: id });
      // const tasks = await Task.find({ event: id });

      return res.status(200).json(events);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'failed take all events' });
    }
  }
}

export default new EventController();
