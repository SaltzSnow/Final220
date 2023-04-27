import { login } from './login';
import { signup } from './signup';

const loginform = document.querySelector('.loginform');
const signupform = document.querySelector('.signupform');

if (loginform) {
    loginform.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('floatingInput').value;
      const password = document.getElementById('floatingPassword').value;
      login(email, password);
    });
  }
  
if (signupform) {
    signupform.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('floatingInputUsername').value;
      const email = document.getElementById('floatingInputEmail').value;
      const password = document.getElementById('floatingPassword').value;
      const passwordConfirm = document.getElementById(
        'floatingPasswordConfirm'
      ).value;
      signup(name, email, password, passwordConfirm);
    });
}