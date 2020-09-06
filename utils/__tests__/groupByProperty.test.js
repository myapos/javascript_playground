import groupByProperty from '../groupByProperty';

describe('groupByProperty', () => {
  it('to be dummy', () => {
    expect(true).toEqual(true);
  });

  it('will group data by property in array', () => {
    const data = [
      {
        user: 'user1',
        payed: true,
        Date: '14-03-2020',
      },
      {
        user: 'user1',
        payed: true,
        Date: '15-03-2020',
      },
      {
        user: 'user2',
        payed: false,
        Date: '14-03-2020',
      },
      {
        user: 'user2',
        payed: true,
        Date: '14-03-2020',
      },
    ];

    const expectedOutput = {
      true: [
        { user: 'user1', payed: true, Date: '14-03-2020' },
        { user: 'user1', payed: true, Date: '15-03-2020' },
        { user: 'user2', payed: true, Date: '14-03-2020' },
      ],
      false: [{ user: 'user2', payed: false, Date: '14-03-2020' }],
    };

    const grouped = groupByProperty(data, 'payed');

    // expect(JSON.stringify(grouped)).toEqual(JSON.stringify(expectedOutput));
    expect(grouped).toMatchObject(expectedOutput);
  });
});
