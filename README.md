# Giphy App

## Description

This application provides searches for GIF images from giphy API service.

## Usage

### Cloud Service
Currently, the application is already deployed on Cloud, open the link below to see the app:

[http://fullgradient.com/apps/giphy-app](http://fullgradient.com/apps/giphy-app)

### Clone the Repository

Run the following command: 

git clone [https://github.com/rodrigomkd/giphy-app.git](https://github.com/rodrigomkd/giphy-app.git)

### Add properties values

Create a 'env' file in the giphy-app root folder and set the following property value:

```
{
	"dev" : {
		"API_KEY" : "{YOUR_GIPHY_API_KEY}"
	}
}
```
### Starting the application

Install [NodeJS](https://nodejs.org/en/)

After NodeJS installaction, to run the application simply run the `npm start` command on the command line at the root directory of the application.

### Interacting with the APP

Once the application has successfully started the APP should be at [http://localhost:3000/](http://localhost:3000/).