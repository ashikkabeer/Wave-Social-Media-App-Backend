const authControls = require('../controllers/authControl')

test('signup function', async () => {
    const data = await authControls.signUp(req,res)
})