const express = require('express');
const { admin, db } = require('./firebaseConfig');
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// API Endpoints

// User Authentication
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    res.status(201).send({ uid: userRecord.uid });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { idToken } = req.body;
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        res.status(200).send({ message: 'Login successful', uid });
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized' });
    }
});


// Health Events
app.post('/api/health-events', async (req, res) => {
  try {
    const { description, location, severity } = req.body;
    if (!description || !location || !severity) {
      return res.status(400).send({ error: 'Description, location, and severity are required' });
    }
    const healthEvent = {
      description,
      location,
      severity,
      timestamp: new Date(),
    };
    const docRef = await db.collection('healthEvents').add(healthEvent);
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/api/health-events', async (req, res) => {
  try {
    const snapshot = await db.collection('healthEvents').get();
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.put('/api/health-events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, location, severity } = req.body;
    const docRef = db.collection('healthEvents').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).send({ error: 'Health event not found' });
    }
    await docRef.update({ description, location, severity });
    res.status(200).send({ message: 'Health event updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.delete('/api/health-events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection('healthEvents').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).send({ error: 'Health event not found' });
    }
    await docRef.delete();
    res.status(200).send({ message: 'Health event deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
