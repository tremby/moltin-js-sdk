import { assert } from 'chai';
import nock from 'nock';
import { gateway as MoltinGateway } from '../../src/moltin';
import { addressesArray as addresses, addressUpdate } from '../factories';

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin addresses', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  });

  it('should return an array of customer addresses', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/customers/customer-1/addresses')
      .reply(200, { data: addresses });

    return Moltin.Addresses.All({ customer: 'customer-1' }).then(response => {
      assert.lengthOf(response.data, 2);
    });
  });

  it('should return an array of customer addresses using a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .get('/customers/customer-1/addresses')
      .reply(200, { data: addresses });

    return Moltin.Addresses.All({
      customer: 'customer-1',
      token: 'testtoken'
    }).then(response => {
      assert.lengthOf(response.data, 2);
    });
  });

  it('should return a single customer address', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/customers/customer-1/addresses/address-1')
      .reply(200, { data: addresses[0] });

    return Moltin.Addresses.Get({
      customer: 'customer-1',
      address: 'address-1'
    }).then(response => {
      assert.propertyVal(response.data, 'id', 'address-1');
    });
  });

  it('should return a single customer address using a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .get('/customers/customer-1/addresses/address-1')
      .reply(200, { data: addresses[0] });

    return Moltin.Addresses.Get({
      customer: 'customer-1',
      address: 'address-1',
      token: 'testtoken'
    }).then(response => {
      assert.propertyVal(response.data, 'id', 'address-1')
    });
  });

  it('should create a new customer address', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/customers/customer-1/addresses')
      .reply(201, { data: { ...addresses[0], id: undefined } });

    return Moltin.Addresses.Create({
      customer: 'customer-1',
      body: addresses[0]
    }).then(response => {
      assert.equal(response.data.type, addresses[0].type);
      assert.equal(response.data.first_name, addresses[0].first_name);
      assert.equal(response.data.last_name, addresses[0].last_name);
      assert.equal(response.data.name, addresses[0].name);
      assert.equal(response.data.phone_number, addresses[0].phone_number);
      assert.equal(response.data.instructions, addresses[0].instructions);
      assert.equal(response.data.company_name, addresses[0].company_name);
      assert.equal(response.data.line_1, addresses[0].line_1);
      assert.equal(response.data.line_2, addresses[0].line_2);
      assert.equal(response.data.city, addresses[0].city);
      assert.equal(response.data.county, addresses[0].county);
      assert.equal(response.data.postcode, addresses[0].postcode);
      assert.equal(response.data.country, addresses[0].country);
    });
  });

  it('should create a new customer address using a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .post('/customers/customer-1/addresses')
      .reply(201, { data: addresses[0] });

    return Moltin.Addresses.Create({
      customer: 'customer-1',
      body: addresses[0],
      token: 'testtoken'
    }).then(response => {
      assert.equal(response.data.id, addresses[0].id);
      assert.equal(response.data.type, addresses[0].type);
      assert.equal(response.data.first_name, addresses[0].first_name);
      assert.equal(response.data.last_name, addresses[0].last_name);
      assert.equal(response.data.name, addresses[0].name);
      assert.equal(response.data.phone_number, addresses[0].phone_number);
      assert.equal(response.data.instructions, addresses[0].instructions);
      assert.equal(response.data.company_name, addresses[0].company_name);
      assert.equal(response.data.line_1, addresses[0].line_1);
      assert.equal(response.data.line_2, addresses[0].line_2);
      assert.equal(response.data.city, addresses[0].city);
      assert.equal(response.data.county, addresses[0].county);
      assert.equal(response.data.postcode, addresses[0].postcode);
      assert.equal(response.data.country, addresses[0].country);
    });
  });

  it('should update a customer address', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/customers/customer-1/addresses/address-1')
      .reply(200, { data: { ...addresses[0], ...addressUpdate } });

    return Moltin.Addresses.Update({
      customer: 'customer-1',
      address: 'address-1',
      body: { ...addresses[0], ...addressUpdate }
    }).then(response => {
      assert.equal(response.data.id, addresses[0].id);
      assert.equal(response.data.type, addresses[0].type);
      assert.equal(response.data.first_name, addresses[0].first_name);
      assert.equal(response.data.name, addresses[0].name);
      assert.equal(response.data.phone_number, addresses[0].phone_number);
      assert.equal(response.data.instructions, addresses[0].instructions);
      assert.equal(response.data.company_name, addresses[0].company_name);
      assert.equal(response.data.line_1, addresses[0].line_1);
      assert.equal(response.data.line_2, addresses[0].line_2);
      assert.equal(response.data.county, addresses[0].county);
      assert.equal(response.data.postcode, addresses[0].postcode);
      assert.equal(response.data.country, addresses[0].country);

      assert.equal(response.data.last_name, addressUpdate.last_name);
      assert.equal(response.data.city, addressUpdate.city);
    });
  });

  it('should update a customer address using a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .put('/customers/customer-1/addresses/address-1')
      .reply(200, { data: { ...addresses[0], ...addressUpdate } });

    return Moltin.Addresses.Update({
      customer: 'customer-1',
      address: 'address-1',
      token: 'testtoken',
      body: { ...addresses[0], ...addressUpdate }
    }).then(response => {
      assert.equal(response.data.id, addresses[0].id);
      assert.equal(response.data.type, addresses[0].type);
      assert.equal(response.data.first_name, addresses[0].first_name);
      assert.equal(response.data.name, addresses[0].name);
      assert.equal(response.data.phone_number, addresses[0].phone_number);
      assert.equal(response.data.instructions, addresses[0].instructions);
      assert.equal(response.data.company_name, addresses[0].company_name);
      assert.equal(response.data.line_1, addresses[0].line_1);
      assert.equal(response.data.line_2, addresses[0].line_2);
      assert.equal(response.data.county, addresses[0].county);
      assert.equal(response.data.postcode, addresses[0].postcode);
      assert.equal(response.data.country, addresses[0].country);

      assert.equal(response.data.last_name, addressUpdate.last_name);
      assert.equal(response.data.city, addressUpdate.city);
    });
  });

  it('should delete a customer address', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/customers/customer-1/addresses/address-1')
      .reply(204);

    return Moltin.Addresses.Delete({
      customer: 'customer-1',
      address: 'address-1'
    }).then(response => {
      assert.equal(response, '{}');
    });
  });

  it('should delete a customer address using a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .delete('/customers/customer-1/addresses/address-1')
      .reply(204);

    return Moltin.Addresses.Delete({
      customer: 'customer-1',
      address: 'address-1',
      token: 'testtoken'
    }).then(response => {
      assert.equal(response, '{}');
    });
  });
});
