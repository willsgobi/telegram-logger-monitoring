import { init, sendTestMessage } from '../src/main';

test('initialize package with correct data', () => {
  const initialized = init('BOT-TOKEN', 54566555);
  expect(initialized).toBe(true);
});

test('Should send message', async () => {
  const result = await sendTestMessage();
  expect(result.success).toBe(true);
});

test('initialize package with incorrect data', () => {
  const initialized = init(
    '6983369889:Aasasas32dKvlwm4OFS1mNfx58lfLyNgDVUZE',
    -4056244471,
  );
  expect(initialized).toBe(true);
});

test('should return false on send message', async () => {
  init('INCORRECT-BOT-TOKEN', 515415151);

  const result = await sendTestMessage();
  expect(result.success).toBe(false);
});
