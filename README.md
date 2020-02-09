# Latitude Finance Credit Card Transaction Exporter

Latitude Finance offers good credit card products but their online system does not support data export. This userscript adds a link to download posted transactions as a CVS file.

## Supported Credit Card Web Sites

* [Latitude Infinity Rewards Visa](https://latitudeinfinity-online.latitudefinancial.com.au/access/login)
* [Latitude 28 Global Platinum Mastercard](https://28degrees-online.latitudefinancial.com.au/access/login)

This script may work for other credit cards from Latitude but I've not tested.


## Installation

To use the script you first need to install a userscript manager on your browser, e.g.

* Firefox - install [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) or [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).
* Chrome - install [Tampermonkey](https://tampermonkey.net/?ext=dhdg&browser=chrome).

Then, [install the script from GitHub](https://raw.githubusercontent.com/shuwada/latitude-card-tx-exporter/master/latitude-card-tx-exporter.user.js).


## Usage

When you have posted transactions, you see a link "Download Posted Transactions" above the list of transactions. Clicking the link starts downloading a CSV file. A CSV file contains only posted transactions displayed on the page. If you would like to download past transactions, select the period, then, download transactions.

The data format is:

`Date,Card Name,Description,Amount`

Date is in ISO format, e.g. 2020-01-20.

## License

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
