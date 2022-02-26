# Gourmet-Guru
### Table of contents
* [Description](#description)
* [Our Roles](#our-roles)
* [Built with](#built-with)
* [Screen Shot](#screen-shot)
* [Application URL](#application-url)


### Description: 
Gourmet guru helps any food lover keep track of all their favorite restaurants, their favorite dishes at those restaurants and gives a rough estimate of the calories of the dish. On page load animate was used to make a nice presentation. The user is presented with two buttons that upon user choice will either bring them to the form where they can create their logs or to the section where their previous logs are stored. Any time that the user is away from the top of the page, a button that will bring users back to the top of the page is displayed in the lower right corner of the screen.
<br>
<br>
The submission form stores the user inputs into local storage and creates elements in the HTML via JS referred to as cards. Each new card containing the user input data has a delete button function to delete that particular item from storage. 
<br>
<br>
Upon submission, a styled modal is displayed that allows for the user to travel to their logged entries or stay where they are and input another entry.  Validations were attached using bootstrap to the user input fields that will let the user know when something invalid has been entered. An interactive 5-star rating was added using font-awesome.
<br>
<br>
We used foursquare server-side API to fetch most of the data about the searched restaurant including true title and address. We used spoontacular server-side API to get the estimated caloric value of the user input. Moment,js was used to log the date of the entry and open weather api was used to get the latitudes and longitudes we needed for using Foursquare.
<br>
<br>
We have a clean and catching UI/design from everything on the page to the modal that appears to create a friendly and inviting user experience. Some fonts were provided by Google Fonts.
<br>
### Our Roles:
Together our team are the sole inventors, creators, designers and programmers of the project. Our job was to come up with a concept that we could execute fully meeting or exceeding the acceptance criteria provided to us by the course. We were to work together using separate branches that we would merge into main after review, gaining an applicable understanding of how to use Github as a team.
<br>

### Built with: 
This application is built using :
* HTML
* CSS
* Bootstrap
* JavaScript
* jQuery
* Font Awesome
* Moment.js
* Open Weather API
* Foursquare
* Spoontacular
* animate
* Google Fonts

### Screen Shot:

![www mitchelwachtel me_gourmet-guru_](https://user-images.githubusercontent.com/95650769/154344288-e5a5bdf1-60b5-444e-a25b-499cf54b864b.png)

### Application URL:

http://www.mitchelwachtel.me/gourmet-guru/

Copyright (c) [2022] [Priyanka Dhende, Mitch Wachtel, & Ross McWey]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

