import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: 'test'
});

stream.on('error', (err) => {
  console.error('Error ingetRandomNoise our kafka stream');
  console.error(err);
});

function queueRandomMessage() {
  const designation = getDesignation();
  const name = getRandomName(designation);
  const event = { designation, name };
  const success = stream.write(eventType.toBuffer(event));     
  if (success) {
    console.log(`message queued (${JSON.stringify(event)})`);
  } else {
    console.log('Too many messages in the queue already..');
  }
}

function getDesignation() {
  const designations = ['Lead', 'Developer' ,'Manager'];
  return designations[Math.floor(Math.random() * designations.length)];
}

function getRandomName(person) {
  if (person === 'Lead') {
    const names = ['Kiran', 'Mr Kamble'];
    return names[Math.floor(Math.random() * names.length)];
  } else if (person === 'Developer') {
    const names = ['Manish', 'Mr Giri'];
    return names[Math.floor(Math.random() * names.length)];
  } 
  else if (person === 'Manager') {
    const names = ['Aditya', 'Mr Kulkarni'];
    return names[Math.floor(Math.random() * names.length)];
  } 
  
  else {
    return 'No body..';
  }
}

setInterval(() => {
  queueRandomMessage();
}, 3000);