vi.mock('axios')
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import SignUp from './SignUp.vue'
import { render, screen } from '@testing-library/vue'

describe('Sign Up', () => {
  describe('when user sets same value for password inputs', () => {
    describe('when user submits form', () => {
      it('send username, email, password to the backend', async () => {
        const user = userEvent.setup()
        render(SignUp)
        const usernameInput = screen.getByLabelText('Username')
        const emailInput = screen.getByLabelText('E-mail')
        const passwordInput = screen.getByLabelText('Password')
        const passwordRepeatInput = screen.getByLabelText('Password Repeat')
        await user.type(usernameInput, 'user1')
        await user.type(emailInput, 'user1@gmail.com')
        await user.type(passwordInput, 'P4ssw0rd01')
        await user.type(passwordRepeatInput, 'P4ssw0rd01')
        const button = screen.getByRole('button', { name: 'Sign Up' })
        await user.click(button)
        // using axios
        expect(axios.post).toHaveBeenCalledWith('/api/v1/users', {
          username: 'user1',
          email: 'user1@gmail.com',
          password: 'P4ssw0rd01'
        })
      })
    })
  })
})
