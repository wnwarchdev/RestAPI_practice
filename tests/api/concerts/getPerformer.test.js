const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const dummyConcert = new Concert({ performer: 'DMX', genre: 'Hiphop', price: 35, day: 2, image: 'mrX.png' });
    await dummyConcert.save();
  });

  after(async () => {
    await Concert.deleteMany({ performer: 'DMX', genre: 'Hiphop', price: 35, day: 2, image: 'mrX.png'  });
  });

  it('getPerformer should return performer', async () => {
    const res = await request(server).get('/api/concerts/performer/DMX');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

}); 