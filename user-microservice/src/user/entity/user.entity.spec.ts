import { UserProfile } from './user.entity';

describe('UserEntity', () => {
  it('should be defined', () => {
    expect(new UserProfile()).toBeDefined();
  });
});
