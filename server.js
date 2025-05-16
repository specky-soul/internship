const express = require('express');
const mongoose = require('mongoose');
const AddProject = require('./models/project');
const cors = require('cors');
const path = require('path');
const contact = require('./models/contact');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://spectacularspecky3:anjana@cluster0.fr98hl7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
  
});

app.use(cors());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// GET route - Get all projects
app.get('/api/services', async (req, res) => {
  try {
    const projects = await AddProject.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});


// POST route - Add a new project
app.post('/api/services', async (req, res) => {
  const { name, status } = req.body;

  if (!name || !status) {
    return res.status(400).json({ error: 'Name and status are required' });
  }

  const prjDetails = new AddProject({ id: Date.now(), name, status });

  try {
    await prjDetails.save();
    res.status(200).json({ message: 'Project added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving project' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


/*
// POST route - Save contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  console.log('Received POST data:', req.body); 

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const contactEntry = new contact({ name, email, phone, message });

  try {
    await contactEntry.save();
    res.status(200).json({ message: 'Contact submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact.' });
  }
});

app.listen(port, () => {
  console.log(Server,running,on http://localhost:${port});
}); */
