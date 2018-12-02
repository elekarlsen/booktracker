
## Project Purpose:

This project was built for the [Udacity's](https://www.udacity.com) React and Front End Nanodegree Programs. The purpose of the project is to demonstrate understanding of the basic structure and operation of a [React](https://reactjs.org) based app. This bookshelf app allows the user to select and categorize books you have read, are currently reading, or want to read.  

![App Demo](/images/demo1.png "demo")

## How to Load the App

The project uses Node.js and the Create-React-App starter.  If you do not have Node >= 6.x installed, you can download it here: [Node.js](https://nodejs.org/en/)

Once Node is installed, navigate to the directory where you want to store the app
```
git clone https://github.com/elekarlsen/booktracker.git
npm install
```
Once all of the dependencies have been installed you can launch the app with
```
npm start
```
A new browser window should automatically open displaying the app.  If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser

## How to Use the App
* Books are sorted into three categories: Currently Reading, Want to Read and Read
![App Demo](/images/demo2.png "demo")
![App Demo](/images/demo3.png "demo")
* To change a book's category or remove a book from the list, click on the green button on  the book cover
![Change menu](/images/menu "menu")

* To add new books, click on the green + button at the bottom of the page.
Enter an author's name or subject. Up to 20 items will be returned.
![App Demo](/images/search.png "search")

