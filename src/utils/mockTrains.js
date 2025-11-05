/**
 * Mock dataset representing a subset of the Belgian rail network.
 * Each train includes high-level details, carriage composition, and metadata used by the UI.
 */
const mockTrains = [
  {
    id: 'train-001',
    stationName: 'Brussels Central',
    destination: 'Antwerpen-Centraal',
    trainName: 'S5',
    time: '12:05',
    platform: '4',
    status: 'On time',
    direction: 'right',
    occupancy: 'Moderate',
    nextStops: ['Schuman', 'Merode', 'Meiser'],
    segments: [
      {
        carriages: [
          { number: 1, features: ['bike', 'wheelchair'] },
          { number: 2, features: ['bike'] },
          { number: 3, features: ['wheelchair'] },
        ],
      },
      {
        carriages: [
          { number: 4, features: [] },
          { number: 5, features: ['quiet'] },
          { number: 6, features: [] },
        ],
      },
    ],
  },
  {
    id: 'train-002',
    stationName: 'Brussels Midi',
    destination: 'Gent-Sint-Pieters',
    trainName: 'IC 4217',
    time: '12:15',
    platform: '9',
    status: 'Boarding',
    direction: 'left',
    occupancy: 'High',
    nextStops: ['Brussels Central', 'Denderleeuw', 'Gent-Dampoort'],
    segments: [
      {
        carriages: [
          { number: 11, features: ['quiet'] },
          { number: 12, features: [] },
          { number: 13, features: ['bike'] },
        ],
      },
      {
        carriages: [
          { number: 14, features: ['wheelchair'] },
          { number: 15, features: ['bike', 'wheelchair'] },
        ],
      },
    ],
  },
  {
    id: 'train-003',
    stationName: 'Antwerpen-Centraal',
    destination: 'Leuven',
    trainName: 'S1',
    time: '12:20',
    platform: '2',
    status: 'Delayed 5 min',
    direction: 'right',
    occupancy: 'Low',
    nextStops: ['Antwerpen-Berchem', 'Mechelen', 'Heverlee'],
    segments: [
      {
        carriages: [
          { number: 'A1', features: ['wheelchair'] },
          { number: 'A2', features: [] },
        ],
      },
      {
        carriages: [
          { number: 'B1', features: ['bike'] },
          { number: 'B2', features: [] },
        ],
      },
    ],
  },
];

export default mockTrains;
