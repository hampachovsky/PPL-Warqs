import Task from '../models/Task.js';

class TaskController {
  async getAll(req, res) {
    try {
      const tasks = await Task.find().populate('author');
      return res.json(tasks);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async create(req, res) {
    try {
      const { text, author, completed } = req.body;
      const task = await Task.create({ text, author, completed });
      res.json(task);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: 'Id missed' });
      }
      const task = await Task.findById(id).populate('author');
      return res.json(task);
    } catch (e) {
      res.status(500).json(e);
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
      return res.json(updatedTask);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: 'Id missed' });
      }
      await Task.findByIdAndRemove(id);
      return res.json(`Deleted ${id}`);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new TaskController();
