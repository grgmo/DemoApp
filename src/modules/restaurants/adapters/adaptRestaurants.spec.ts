import adaptRestaurants from './adaptRestaurants';

describe('adaptRestaurants', () => {
  it('should return restaurants data correctly', () => {
    const mockRestaurants = {
      data: {
        restaurant: {
          items: [
            {
              name: 'Aberdeen - Belmont Street',
              url: 'https://www.nandos.co.uk/eat/restaurants/aberdeen-belmont-street',
              geo: {
                address: {
                  streetAddress: 'Unit 10, The Academy, Belmont St',
                  addressLocality: 'Aberdeen, Aberdeen City',
                  postalCode: 'AB10 1LB',
                },
              },
            },
            {
              name: 'Aberdeen - Union Square',
              url: 'https://www.nandos.co.uk/eat/restaurants/aberdeen-union-square',
              geo: {
                address: {
                  streetAddress: 'Unit FS17, Union Square, Guild St',
                  addressLocality: 'Aberdeen, Aberdeen City',
                  postalCode: 'AB11 5RG',
                },
              },
            },
          ],
        },
      },
    };
    const adaptedData = adaptRestaurants(mockRestaurants);
    expect(adaptedData).toEqual([
      {
        title: 'Aberdeen - Belmont Street',
        url: 'https://www.nandos.co.uk/eat/restaurants/aberdeen-belmont-street',
        street: 'Unit 10, The Academy, Belmont St',
        locality: 'Aberdeen, Aberdeen City',
        postCode: 'AB10 1LB',
      },
      {
        title: 'Aberdeen - Union Square',
        url: 'https://www.nandos.co.uk/eat/restaurants/aberdeen-union-square',
        street: 'Unit FS17, Union Square, Guild St',
        locality: 'Aberdeen, Aberdeen City',
        postCode: 'AB11 5RG',
      },
    ]);
  });
});
