const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const receipts = {};

const calculatePoints = (receipt) => {
    let points = 0;
    
    points += receipt.retailer.replace(/[^a-zA-Z]/g, '').length;
    console.log('Rule 1 points:', points);  // After Rule 1

    if(parseFloat(receipt.total) % 1 === 0){
        points += 50;
    }
    console.log('Rule 2 points:', points);  // After Rule 2

    if((parseFloat(receipt.total) * 100) % 25 === 0){
        points += 25;
    }
    console.log('Rule 3 points:', points);  // After Rule 3

    points += Math.floor(receipt.items.length / 2) * 5;
    console.log('Rule 4 points:', points);  // After Rule 4

    receipt.items.forEach(item => {
        if (item.shortDescription.trim().length % 3 === 0){
            points += Math.ceil(parseFloat(item.price) * 0.2);
        }
    });
    console.log('Rule 5 points:', points);  // After Rule 5

    const day = new Date(`${receipt.purchaseDate}T00:00:00Z`).getUTCDate(); // UTC to avoid timezone issues
    if (day % 2 !== 0) {
        points += 6;
    }

    console.log('Day:', day);
    console.log('Rule 6 points:', points);  // After Rule 6

    const purchaseTime = new Date(`1970-01-01T${receipt.purchaseTime}Z`);
    const twoPM = new Date('1970-01-01T14:00:00Z');
    const fourPM = new Date('1970-01-01T16:00:00Z');
    if (purchaseTime >= twoPM && purchaseTime <= fourPM){
        points += 10;
    }
    console.log('Rule 7 points:', points);  // After Rule 7

    return points;
};

app.post('/receipts/process', (req, res) => {
    const id = uuidv4();
    const receipt = req.body;
    const points = calculatePoints(receipt);
    receipts[id] = { receipt, points };

    res.json({ id });
});

app.get('/receipts/:id/points', (req, res) => {
    const id = req.params.id;
    const data = receipts[id];

    if (!data){
        return res.status(404).json({ error: 'Receipt not found' });
    }

    res.json({ points: data.points });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Running on port ${PORT}`);
});

//Tested endpoints with Postman