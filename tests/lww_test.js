import LWW from '../src/lww';

const mockDate = (date) => {
  jest
    .spyOn(global.Date, 'now')
    .mockImplementationOnce(() =>
      new Date(date).valueOf()
    );
};

describe('LWW tests', () => {

  let lww;
  beforeEach(() => {
    lww = new LWW();
  });


  test('Remove element', () => {
    lww.add('abc');
    expect(lww.merge()).toEqual(['abc']);
    lww.remove('abc');
    expect(lww.merge()).toEqual([]);
  });


  test('Remove empty', () => {
    expect(lww.merge()).toEqual([]);
    lww.remove('');
    expect(lww.merge()).toEqual([]);

  });

  describe('Add tests', () => {

    test('Add an element', () => {

      lww.add('abc');
      expect(lww.merge()).toEqual(['abc']);

    });

    test('Add a duplicated element (update)', () => {

      lww.add('abc');
      lww.add('abc');
      expect(lww.merge()).toEqual(['abc']);

    });

    test('null key', () => {
      lww.add(null);
      expect(lww.merge()).toEqual([]);
    });

  });

  test('Test Add and Remove at the same time', () => {

    mockDate('2019-05-14T11:01:58.135Z');
    lww.add('abc');

    mockDate('2019-05-14T11:01:58.135Z');
    lww.remove('abc');

    expect(lww.merge()).toEqual(['abc']);

  });

  // Test for order-insensitive, should tolerate message re-ordering
  test('Test for Commutativity and associative', () => {

    mockDate('2019-06-14T11:01:58.135Z');
    lww.add('abc');

    mockDate('2019-07-14T11:01:58.135Z');
    lww.remove('abc');

    expect(lww.merge()).toEqual([]);

    mockDate('2019-07-14T11:01:58.135Z');
    lww.remove('abc');

    mockDate('2019-06-14T11:01:58.135Z');
    lww.add('abc');

    expect(lww.merge()).toEqual([]);

  });

  // Should be able to call the same function more than once and get the same result
  test('Test for Idempotence', () => {

    lww.add('abc');

    mockDate('2020-09-14T11:01:58.135Z');
    lww.add('abc');

    expect(lww.merge()).toEqual(['abc']);

  });

  describe('Test for lookup', () => {

    test('add', () => {
      lww.add('abc');
      expect(lww.lookup('abc')).toBeDefined();

    });

    test('for non existed key', () => {
      expect(lww.lookup('abc')).toBeUndefined();
    });

    test('for removed key', () => {
      lww.remove('abc');
      expect(lww.lookup('abc')).toBeUndefined();
    });

    test('for null key', () => {
      expect(lww.lookup()).toBeUndefined();
    });

  });

});
