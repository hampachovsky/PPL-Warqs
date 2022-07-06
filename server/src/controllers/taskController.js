import Task from '../models/Task.js';
import Event from '../models/Event.js';

class TaskController {
  async getAll(req, res) {
    try {
      const tasks = await Task.find();
      return res.status(200).json(tasks);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async create(req, res) {
    try {
      const { text, eventId } = req.body;
      const foundedEvent = await Event.findById(eventId);
      if (!eventId) {
        return res.status(500).json({ error: 'Event id not provided' });
      }
      if (!text) return res.status(400).json({ error: 'Text not provided' });
      const taskToAdd = {
        text,
        event: foundedEvent._id,
      };
      console.log(taskToAdd);
      const task = await Task.create(taskToAdd);
      await Event.findByIdAndUpdate(foundedEvent._id, { ...foundedEvent, tasks: foundedEvent.tasks.push(task._id) });
      return res.status(200).json(task);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Create task error' });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'Id not provided' });
      }
      const task = await Task.findById(id);
      return res.json(task);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'failed take event' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const task = req.body;
      if (!id) {
        res.status(400).json({ error: 'Id missed' });
      }
      const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true });
      return res.status(200).json(updatedTask);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Update task error' });
    }
  }

  async delete(req, res) {
    try {
      const taskId = req.params.id;
      if (!taskId) {
        return res.status(500).json({ error: 'Id of task not provided' });
      }
      const task = await Task.findById(taskId);
      const foundedEvent = await Event.findById(task.event._id);
      foundedEvent.tasks = foundedEvent.tasks.filter((t) => t._id.toString() !== task._id);
      await foundedEvent.save();

      await Task.findByIdAndRemove(task._Id, { new: true });
      return res.status(200).json(null);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'failed delete task' });
    }
  }
}

export default new TaskController();
