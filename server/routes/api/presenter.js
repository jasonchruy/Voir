const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Schedules
router.get('/', async (req, res) => {
    //res.send('Test');
    const schedules = await loadSchedulesCollection();
    res.send(await schedules.find({}).toArray());
});

// Add Schedules
router.post('/', async(req, res) => {
    const schedules = await loadSchedulesCollection();
    await schedules.insertOne({
        created_at: new Date(),
        created_by: req.body.created_by,
        date: req.body.date,
        name: req.body.name,
        remarks: req.body.remarks
    })

    res.status(201).send();
});

// Delete Schedules
router.delete('/:id', async(req, res) => {
    const schedules = await loadSchedulesCollection();
    await schedules.deleteOne({ _id : new mongodb.ObjectID( req.params.id ) })

    res.status(200).send();
})


async function loadSchedulesCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://jasonu:12341234@cluster0.uhzgz.mongodb.net/song_presenter?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    return client.db('song_presenter').collection('schedules')
}

module.exports = router;