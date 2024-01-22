// In the development of this project, I utilized OpenAI's ChatGPT,
// to assist with various aspects of coding, including troubleshooting, 
// code optimization, and the implementation of specific features.

import { HOMEPAGE_TITLE, STUDENT_NAME } from '../../lang/messages/en/user.js';

document.addEventListener('DOMContentLoaded', () => {
    document.title = HOMEPAGE_TITLE;
    document.querySelector('h1').textContent = HOMEPAGE_TITLE;
    document.querySelector('h2').textContent = STUDENT_NAME;
});
