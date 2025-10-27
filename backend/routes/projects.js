import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// Get all projects (public or user's own)
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    let query = {};
    
    if (userId) {
      query = { $or: [{ userId }, { isPublic: true }] };
    } else {
      query = { isPublic: true };
    }

    const projects = await Project.find(query).sort({ updatedAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// Get single project by projectId
router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
});

// Create new project
router.post('/', async (req, res) => {
  try {
    const { projectId, name, description, files, userId, isPublic } = req.body;

    // Check if project with same projectId exists
    const existingProject = await Project.findOne({ projectId });
    if (existingProject) {
      return res.status(400).json({ message: 'Project with this ID already exists' });
    }

    const project = new Project({
      projectId,
      name,
      description,
      files: files || [],
      userId: userId || null,
      isPublic: isPublic || false,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
});

// Update project
router.put('/:projectId', async (req, res) => {
  try {
    const { name, description, files, isPublic } = req.body;
    
    const project = await Project.findOneAndUpdate(
      { projectId: req.params.projectId },
      { name, description, files, isPublic, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

// Delete project
router.delete('/:projectId', async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ projectId: req.params.projectId });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

export default router;
