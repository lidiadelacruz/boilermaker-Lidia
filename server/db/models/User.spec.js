const { expect } = require('chai')
const { db, User } = require('..')

describe('User Model Test', () => {
  beforeEach(() => {
    return db.sync({ force:true })
  })
  it('correct password validates password', async () => {
    const user = await User.create({
      name: 'luna',
      password: 'cute'
    })
    expect(user.correctPassword('cute')).to.be.equal(true)
  })
})
