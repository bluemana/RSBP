# RSBP

[![Build Status](https://travis-ci.org/consensusRealityIO/RSBP.png?branch=master)](https://travis-ci.org/consensusRealityIO/RSBP)

*Real Simple Bitcoin Payments* is a single webpage that facilitates bitcoin payments, converting a fiat currency amount into a real-time bitcoin amount, creating the QR code, and acknowledging payment on the blockchain.
It doesn't contain any server-side code and is very easy to install for your own use.

Parameters can be hard-coded or passed in the URL (optional).

Parameters include:

- `currency` - The three-character currency code, i.e. BTC, USD, IDR, ZAR
- `amount` - The amount in fiat currency to be converted to BTC
- `address` - The Bitcoin address to be paid
- `discount` - The discount percentage to be applied to the conversation rate

You can see a running example implementation here:
https://consensusreality.io/demo/RSBP/pay.html

2 minute demo:
https://www.youtube.com/watch?v=YMXKmTM_PKE

## Installation

To install `RSBP`:

```sh
npm install
```

To test `RSBP`:

```sh
npm test
```

To start the server:

```sh
npm start
```

## Configuration

`config-default.json` is the default configuration file of the server. To override the default configuration create a file `config.json` and use the `config-default.json` for reference.

With the default configuration, the public page of user `consensus-reality` can be accessed at `http://localhost:3000/consensus-reality/pay.html`.
