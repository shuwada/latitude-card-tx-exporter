// ==UserScript==
// @name         Latitude Finance Credit Card Transaction Exporter
// @namespace    https://github.com/shuwada/latitude-card-tx-exporter
// @version      0.1
// @description  Download Credit Card Transaction History from Latitude Finance
// @author       Hiroshi Wada
// @match        https://*.latitudefinancial.com.au/*
// @grant        none
// ==/UserScript==

/**
 * Adding a link to download posted transactions.
 */
function addPostedTxDownloadLink() {
    const postedTxs = document.querySelector('div[name="postedTransactions"]')

    if (postedTxs != undefined) {
        // if there is no posted transactions, show "No Posted Transactions"
        var downloadLink = document.createElement('div');
        downloadLink.innerHTML = 'No Posted Transactions';

        const data = transactionToCsv();
        if (data) {
            downloadLink = createCsvDownloadLink(data);
        }

        postedTxs.parentNode.insertBefore(downloadLink, postedTxs)
    }
}

/**
 * Scrape posted transactions on the page and convert them to a CSV string
 */
function transactionToCsv() {
    const txs = document.querySelectorAll('div[name="postedTransactions"] tr[name="DataContainer"]');
    const csv = Array.from(txs).map(tx => {
        const date = tx.querySelector('div[name="Transaction_TransactionDate"]').textContent.trim();
        const payer = tx.querySelector('div[name="Transaction_CardName"]').textContent.trim();
        const desc = tx.querySelector('div[name="Transaction_TransactionDescription"]').textContent.trim().replace(/\s+/g, ' ');
        const amount = tx.querySelector('div[name="Transaction_Amount"]').textContent.trim();
        return [toISODate(date), payer, desc, amount].join(',');
	});
    return csv.join('\n');
}

/**
 * Convert a date string ('yesterday' or 'dd MMM yyyy' is expected) to 'yyyy-MM-dd'
 */
function toISODate(dateString) {
    // Map the input string to ISO format (UTC) and take the date part
    return toDate(dateString).toISOString().substring(0, 10);
}

function toDate(dateString) {
    if (dateString.toLowerCase() == 'yesterday') {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d;
    } else {
        // Parse the input date as UTC
        return new Date(Date.parse(dateString + " 00:00:00 UTC"));
    }
}

function createCsvDownloadLink(csvDataString) {
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvDataString);
    downloadLink.download = `transactions-${window.location.hostname}-${(new Date()).toISOString()}.csv`;
    downloadLink.innerHTML = 'Download Posted Transactions';
    return downloadLink
}

(function() {
    'use strict';
    addPostedTxDownloadLink();
})();