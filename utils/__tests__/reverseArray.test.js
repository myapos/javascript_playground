import reverseArray from '../reverseArray';

describe('reverseArray', () => {
  it('will reverse array', () => {
    const data = [
      {
        user: 'user1',
        payed: true,
        Date: '14-03-2020',
      },
      {
        user: 'user2',
        payed: true,
        Date: '15-03-2020',
      },
      {
        user: 'user3',
        payed: false,
        Date: '14-03-2020',
      },
      {
        user: 'user4',
        payed: true,
        Date: '14-03-2020',
      },
    ];

    const expectedOutput = [
      { user: 'user4', payed: true, Date: '14-03-2020' },
      { user: 'user3', payed: false, Date: '14-03-2020' },
      { user: 'user2', payed: true, Date: '15-03-2020' },
      { user: 'user1', payed: true, Date: '14-03-2020' },
    ];

    const reversed = reverseArray(data, 'payed');

    // console.log('reversed', reversed);
    expect(JSON.stringify(reversed)).toEqual(JSON.stringify(expectedOutput));
    expect(reversed).toMatchObject(expectedOutput);
  });
});
