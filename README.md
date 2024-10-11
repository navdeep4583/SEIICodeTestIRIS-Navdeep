# IRIS Code Test

## Submission

* Completed all parts of the test
* Added Table and Paginaton as reuseable components. Similarly if we have more advanced filters those can also be created as seperate components.
* Used Bootstrap for styling over Material as Material already provide table components with full filtering and sorting capabilities
* Pagination, sorting and filtering can be implemented on the API side considering the large amount of data.


### Api Setup

To setup the api run the following:

Navigate to api folder: `cd iris-test-api`
Install packages: `npm install`
Run api: `npm run start`

Check the api is up and running by using:
`curl http://localhost:3000/v1/subdivisions`

### Angular app Setup

To setup the test script run the following:

At the root of the SEICodeTest folder run:
`npm install`

To run the script: `npm run start`

## Test

The test is broken down into three parts.

### Part 1 - Retrieving and Displaying the data

The first part of this test requires you to retrieve the subdivision data from the api and display it in 
the angular application. This can be displayed in any way you so choose and any third party libraries can
be chosen to aid in this. You can see the structure of the subdivision data in the api/src/subdivision.json
file. Note: the data set contains around 1000 subdivisions so you may need to think about how that is 
displayed (e.g pagination, infinite scrolling etc).

### Part 2
 Give the user the ability to filter the data based on subdivisionDataCode (This can be either Active, Future 
 or Builtout (See Glossary). Also, allow the user to sort the data based on subdivision name or nearMapImageDate.

### Part 3

Finally, write some unit tests for the code that has been written. If you start to run out of time at this point
then just attempt one test and write some comments about what other tests you would've written. Angular comes
with Jasmine packaged with it so it is preferred that you use this framework however if you are low on time and
are more comfortable with another testing framework (e.g Jest).

## Glossary

subdivision - An area of land containing lots or plots of land for property development <br />
subdivision status code - The status of the subdivision. Can either be: <br />
ACTIVE: This subdivision has ongoing construction <br />
FUTURE: This subdivision will have construction in the near future <br />
BUILT OUT: This subdivisions construction has been completed <br />
NearMap: NearMap is one of the providers used at Zonda satellite for our image data. <br />
