# Update Scripts

## PHP
**write.php**
- Writes incoming POST requests to **variables.js** (used by **update.js**)
- Post variables called:
	- (o/n)Name
	- (o/n)Filename
	- (o/n)Label
	- (o/n)Reviewscore
	- (o/n)Reviewlink
	- (o/n)Price
	- (o/n)Shoplink
Demo: [mxdi.xyz/squig](https://mxdi.xyz/squig)

## JavaScript
**update.js**
- Updates json with new information
	- Reads **variables.js** (reference **write.php**)
